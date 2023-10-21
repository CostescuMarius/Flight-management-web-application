package com.flights.account.dto;

import java.util.Map;

import com.flights.account.type.EmailType;

import lombok.Getter;
import lombok.Setter;

/**
 * An object representing email information.
 */
@Getter
@Setter
public class EmailInfo {

	/**
	 * The type of the email.
	 */
	private EmailType type;

	/**
	 * The email address of the recipient.
	 */
	private String emailAddress;

	/**
	 * Data for constructing the email content.
	 */
	private Map<String, Object> emailData;
}
