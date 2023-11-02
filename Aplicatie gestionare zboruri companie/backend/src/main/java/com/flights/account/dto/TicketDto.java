package com.flights.account.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
	private int id;
	
    private int flightId;
    
    private String type;
    
    private double price;
}
