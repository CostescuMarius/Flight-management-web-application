package com.flights.account.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flights.account.dto.ShoppingCartDto;
import com.flights.account.model.ShoppingCart;
import com.flights.account.repository.ShoppingCartRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class ShoppingCartService {
	@Autowired
	private ShoppingCartRepository shoppingCartRepository;

	public ShoppingCart addTicketToShoppingCart(ShoppingCart shoppingCartProduct) {
		
		shoppingCartProduct = shoppingCartRepository.save(shoppingCartProduct);
		
		return shoppingCartProduct;
	}
	
	public ShoppingCart findByUserEmailAndTicketId(String userEmail, int ticketId) {
        return shoppingCartRepository.findByUserEmailAndTicketId(userEmail, ticketId);
    }
	
	
	public void deleteTicketFromShoppingCart(ShoppingCartDto shoppingCartDto) {
    	List<ShoppingCart> shoppingCartProducts = shoppingCartRepository.findAll();
    	
    	for(ShoppingCart product : shoppingCartProducts) {
    		if(product.getUser().getEmail().equals(shoppingCartDto.getUserEmail()) &&
    				product.getTicket().getId().equals(shoppingCartDto.getTicketId())){
    			shoppingCartRepository.delete(product);
    		}
    	}
		
    }
	
	public List<ShoppingCart> getFullShoppingCart() {
        return shoppingCartRepository.findAll();
    }
}
