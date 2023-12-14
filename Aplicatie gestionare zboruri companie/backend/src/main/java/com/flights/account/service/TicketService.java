package com.flights.account.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flights.account.dto.BuyTicketDto;
import com.flights.account.dto.DeleteTicketDto;
import com.flights.account.dto.UpdateTicketDto;
import com.flights.account.exception.AccountException;
import com.flights.account.exception.InternalErrorCode;
import com.flights.account.messages.Message;
import com.flights.account.model.Ticket;
import com.flights.account.repository.TicketRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class TicketService {
	@Autowired
	private TicketRepository ticketRepository;

	public Ticket addTicket(Ticket newTicket) {
		newTicket = ticketRepository.save(newTicket);
		
		return newTicket;
	}
	
	
	public void deleteTicket(DeleteTicketDto deleteTicketDto) {
        int ticketId = deleteTicketDto.getId();
        
		if(!ticketRepository.existsById(ticketId)) {
            throw new AccountException(Message.TICKET_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
        }
        
		Ticket ticketToDelete = ticketRepository.findById(ticketId);
		
		ticketRepository.delete(ticketToDelete);
    }
	
	public Ticket updateTicket(UpdateTicketDto newTicket) {
		Ticket currentTicket = ticketRepository.findById(newTicket.getId());
		
		currentTicket.setPrice(newTicket.getPrice());
	    
		ticketRepository.save(currentTicket);
	    
	    return currentTicket;
	}

    public List<String> getAllTicketsDetails() {
    	List<Ticket> tickets = ticketRepository.findAll();

    	List<String> ticketDetails = new ArrayList<>();

        for (Ticket ticket : tickets) {
        	ticketDetails.add(ticket.getId() + "   Type: " + ticket.getType() +
        			"   Price: " + ticket.getPrice());
        }

        return ticketDetails;
    }
    
    public List<Ticket> getTicketsRaport() {
    	return ticketRepository.findAll();
    }
    
    
    public Ticket getTicketById(int id) {
    	return ticketRepository.findById(id);
    }


	public List<Ticket> checkAvailableTickets(BuyTicketDto buyTicket) {
		String departureAirport = buyTicket.getDepartureAirportName();
        String arrivalAirport = buyTicket.getArrivalAirportName();
        LocalDate date = buyTicket.getDepartureDate().toLocalDateTime().toLocalDate();
        
        List<Ticket> availableTickets = new ArrayList<Ticket>();
        
		for(Ticket ticket : ticketRepository.findAll()) {
			if(ticket.getFlight().getDepartureAirport().getName().equals(departureAirport) &&
					ticket.getFlight().getArrivalAirport().getName().equals(arrivalAirport) &&
					ticket.getFlight().getDepartureDate().toLocalDateTime().toLocalDate().equals(date)) {
				availableTickets.add(ticket);
			}
		}
		return availableTickets;
	}
}
