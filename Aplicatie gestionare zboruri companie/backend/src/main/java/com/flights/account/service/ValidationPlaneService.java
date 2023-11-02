package com.flights.account.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.flights.account.exception.InputValidationError;
import com.flights.account.exception.MultipleAccountException;
import com.flights.account.messages.Message;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;


@Service
@Scope("singleton")
public class ValidationPlaneService {

	@Autowired
	private Validator validator ;


	private static final Map<String, Message> MESSAGE_ID_MAP = new HashMap<>();

	static {
		MESSAGE_ID_MAP.put("{jakarta.validation.constraints.NotBlank.message}", Message.EMPTY_FIELD);
		MESSAGE_ID_MAP.put("{jakarta.validation.constraints.Min.message}", Message.MIN_VALUE);
	}

	public void validate(Object object) {

		Set<ConstraintViolation<Object>> constraintViolations = validator.validate(object);

		if (!constraintViolations.isEmpty()) {
			List<InputValidationError> errorMessages = new ArrayList<>();
			for(ConstraintViolation<Object> violation : constraintViolations){
				String messageTemplate = violation.getMessageTemplate();
				Message message = MESSAGE_ID_MAP.getOrDefault(messageTemplate, Message.BAD_REQUEST);
				errorMessages.add(new InputValidationError( violation.getPropertyPath().toString(), message.getMessage(), message.getId()));
			}
			throw new MultipleAccountException(errorMessages);
		}
	}
}
