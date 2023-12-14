package com.flights.account.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flights.account.dto.UserTicketDto;
import com.flights.account.model.UserTicket;
import com.flights.account.service.TicketService;
import com.flights.account.service.UserService;


@Component
public class UserTicketConverter {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TicketService ticketService;

	
	public UserTicketDto entityToDto(UserTicket userTicket) {
		
		UserTicketDto userTicketDto = new UserTicketDto();
		
		userTicketDto.setUserEmail(userTicket.getUser().getEmail());
		userTicketDto.setTicketId(userTicket.getTicket().getId());

		return userTicketDto;
	}
	
	
	public UserTicket dtoToEntity(UserTicketDto userTicketDto) {
	
		UserTicket userTicket = new UserTicket();
		
		userTicket.setUser(userService.getUserByEmail(userTicketDto.getUserEmail()));
		userTicket.setTicket(ticketService.getTicketById(userTicketDto.getTicketId()));
		
		return userTicket;
	}
}
