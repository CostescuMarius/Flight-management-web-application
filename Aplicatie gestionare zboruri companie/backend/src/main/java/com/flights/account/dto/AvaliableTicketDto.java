package com.flights.account.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvaliableTicketDto {
	private int ticketId;
	
	private String departureAirportName;
	
	private String departureLocation;
	
    private String arrivalAirportName;
    
    private String arrivalLocation;
    
    private Timestamp departureDate;
    
    private Timestamp arrivalDate;
    
    private String type;
    
    private double price;
}
