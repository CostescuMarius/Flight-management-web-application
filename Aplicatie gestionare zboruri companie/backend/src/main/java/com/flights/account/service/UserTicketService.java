package com.flights.account.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flights.account.dto.UserTicketDto;
import com.flights.account.model.UserTicket;
import com.flights.account.repository.UserTicketRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class UserTicketService {
	@Autowired
	private UserTicketRepository userTicketRepository;

	public UserTicket addTicketToWishlist(UserTicket userTicket) {
		userTicket = userTicketRepository.save(userTicket);
		
		return userTicket;
	}
	
	
	public void deleteTicketFromWishlist(UserTicketDto deleteUserTicketDto) {
    	List<UserTicket> wishlist = userTicketRepository.findAll();
    	
    	for(UserTicket elementFromWishlist : wishlist) {
    		if(elementFromWishlist.getUser().getEmail().equals(deleteUserTicketDto.getUserEmail()) &&
    				elementFromWishlist.getTicket().getId().equals(deleteUserTicketDto.getTicketId())){
        		userTicketRepository.delete(elementFromWishlist);
    		}
    	}
		
    }
	
	public List<UserTicket> getFullWishlist() {
        return userTicketRepository.findAll();
    }
    
    /*public Airport getAirportById(int id) {
    	if(!airportRepository.existsById(id)) {
    		throw new AccountException(Message.AIRPORT_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
    	}
    	
    	return airportRepository.findById(id);
    }
    
    public Airport getAirportByName(String name) {
    	if(!airportRepository.existsByName(name)) {
    		throw new AccountException(Message.AIRPORT_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
    	}
    	
    	return airportRepository.findByName(name);
    }*/
}
