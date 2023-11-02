package com.flights.account.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateFlightDto {
	private int id;
	
    private String planeName;
    
    private Timestamp departureDate;
    
    private Timestamp arrivalDate;
}
