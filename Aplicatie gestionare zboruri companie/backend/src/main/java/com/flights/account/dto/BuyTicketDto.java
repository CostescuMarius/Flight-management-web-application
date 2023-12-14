package com.flights.account.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyTicketDto {
	private String departureAirportName;
    
    private String arrivalAirportName;
    
    private Timestamp departureDate;
}
