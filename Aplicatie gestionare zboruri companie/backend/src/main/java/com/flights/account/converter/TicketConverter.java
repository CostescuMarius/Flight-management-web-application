package com.flights.account.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flights.account.dto.TicketDto;
import com.flights.account.model.Ticket;
import com.flights.account.service.FlightService;


@Component
public class TicketConverter {
	@Autowired
	private FlightService flightService;
	
	public TicketDto entityToDto(Ticket ticket) {
		
		TicketDto ticketDto = new TicketDto();
		
		ticketDto.setFlightId(ticket.getFlight().getId());
		ticketDto.setType(ticket.getType());
		ticketDto.setPrice(ticket.getPrice());

		return ticketDto;
	}
	
	
	public Ticket dtoToEntity(TicketDto ticketDto) {
		Ticket ticket = new Ticket();
		
		ticket.setFlight(flightService.getFlightById(ticketDto.getFlightId()));
		ticket.setType(ticketDto.getType());
		ticket.setPrice(ticketDto.getPrice());
		
		return ticket;
	}
}
