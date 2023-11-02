package com.flights.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flights.account.converter.TicketConverter;
import com.flights.account.dto.DeleteTicketDto;
import com.flights.account.dto.TicketDto;
import com.flights.account.dto.UpdateTicketDto;
import com.flights.account.model.Ticket;
import com.flights.account.service.TicketService;


@RestController
@RequestMapping("/api/tickets")
public class TicketController {
	
	@Autowired
	private TicketService ticketService;

	@Autowired
	private TicketConverter ticketConverter;
	

	@PostMapping("/add")
	public TicketDto addTicket(@RequestBody TicketDto newTicketDto){
		
		Ticket newTicket = ticketConverter.dtoToEntity(newTicketDto);	
		
		Ticket addedTicket = ticketService.addTicket(newTicket);
		return ticketConverter.entityToDto(addedTicket);
	}
	
    @PutMapping("/delete")
    public ResponseEntity<Object> deleteFlight(@RequestBody DeleteTicketDto deleteTicketDto) {
    	ticketService.deleteTicket(deleteTicketDto);
        
        return ResponseEntity.ok().build();
    }

	@GetMapping("/details")
	public List<String> getAllTickets() {
		return ticketService.getAllTickets();
	}
	
    @PutMapping("/update")
    public TicketDto updateUserName(@RequestBody UpdateTicketDto newTicket) {
    	Ticket updatedTicket = ticketService.updateTicket(newTicket);
        return ticketConverter.entityToDto(updatedTicket);
    }
    
}
	
	

	
