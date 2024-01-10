package com.flights.account.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flights.account.dto.ShoppingCartDto;
import com.flights.account.model.ShoppingCart;
import com.flights.account.service.TicketService;
import com.flights.account.service.UserService;


@Component
public class ShoppingCartConverter {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TicketService ticketService;

	
	public ShoppingCartDto entityToDto(ShoppingCart shoppingCart) {
		
		ShoppingCartDto shoppingCartDto = new ShoppingCartDto();
		
		shoppingCartDto.setUserEmail(shoppingCart.getUser().getEmail());
		shoppingCartDto.setTicketId(shoppingCart.getTicket().getId());
		shoppingCartDto.setCantity(shoppingCart.getCantity());

		return shoppingCartDto;
	}
	
	
	public ShoppingCart dtoToEntity(ShoppingCartDto shoppingCartDto) {
	
		ShoppingCart shoppingCart = new ShoppingCart();
		
		shoppingCart.setUser(userService.getUserByEmail(shoppingCartDto.getUserEmail()));
		shoppingCart.setTicket(ticketService.getTicketById(shoppingCartDto.getTicketId()));
		shoppingCart.setCantity(shoppingCartDto.getCantity());
		
		return shoppingCart;
	}
}
