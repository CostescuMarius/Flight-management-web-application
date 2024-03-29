package com.flights.account.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingCartDto {

	@NotBlank
	private String userEmail;
	
	@NotBlank
	private int ticketId;
	
	@NotBlank
	private int cantity;
}
