package com.flights.account.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flights.account.converter.UserTicketConverter;
import com.flights.account.dto.UserTicketDto;
import com.flights.account.model.UserTicket;
import com.flights.account.service.UserTicketService;
import com.flights.account.service.ValidationService;


@RestController
@RequestMapping("/api/wishlist")
public class UserTicketController {
	
	@Autowired
	private UserTicketService userTicketService;

	@Autowired
	private UserTicketConverter userTicketConverter;
	
	@Autowired
	private ValidationService validationService;
	

	@PostMapping("/add")
	public List<UserTicketDto> addUserTicket(@RequestBody UserTicketDto newUserTicketDto){
		UserTicket newUserTicket = userTicketConverter.dtoToEntity(newUserTicketDto);
		
		userTicketService.addTicketToWishlist(newUserTicket);
		
		List<UserTicket> wishlist = userTicketService.getFullWishlist();
		
		List<UserTicketDto> wishlistDto = new ArrayList<>();
		for(UserTicket element : wishlist) {
			wishlistDto.add(userTicketConverter.entityToDto(element));
		}
		
		return wishlistDto;
	}
	
    @PostMapping("/delete")
    public List<UserTicketDto> deleteUserTicket(@RequestBody UserTicketDto deleteUserTicketDto) {

    	userTicketService.deleteTicketFromWishlist(deleteUserTicketDto);
        
    	List<UserTicket> wishlist = userTicketService.getFullWishlist();
		
		List<UserTicketDto> wishlistDto = new ArrayList<>();
		for(UserTicket element : wishlist) {
			wishlistDto.add(userTicketConverter.entityToDto(element));
		}
		
		return wishlistDto;
    }
	

	@GetMapping("/all")
	public List<UserTicketDto> getWishlist() {
		List<UserTicket> wishlist = userTicketService.getFullWishlist();
		
		List<UserTicketDto> wishlistDto = new ArrayList<>();
		for(UserTicket element : wishlist) {
			wishlistDto.add(userTicketConverter.entityToDto(element));
		}
		
		return wishlistDto;
	}
    
}
	
	

	
