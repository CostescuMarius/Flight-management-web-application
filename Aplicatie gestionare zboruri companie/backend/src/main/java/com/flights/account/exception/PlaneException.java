package com.flights.account.exception;

import org.springframework.http.HttpStatus;

import com.flights.account.messages.Message;

import lombok.Getter;

@Getter
public class PlaneException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	private final HttpStatus status;
	
	private final String messageId;
	
	private final InternalErrorCode errorCode;
	
	public PlaneException(Message message, HttpStatus status, InternalErrorCode errorCode) {
		super(message.getMessage());
		this.status = status;
		this.messageId = message.getId();
		this.errorCode = errorCode;
	}
}


