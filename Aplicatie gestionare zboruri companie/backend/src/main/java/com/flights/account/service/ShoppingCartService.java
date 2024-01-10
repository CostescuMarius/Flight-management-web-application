package com.flights.account.service;

import java.util.ArrayList;
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
		String status = "not ordered";
        return shoppingCartRepository.findByUserEmailAndTicketIdAndStatus(userEmail, ticketId, status);
    }
	
	
	public void deleteTicketFromShoppingCart(ShoppingCartDto shoppingCartDto) {
    	List<ShoppingCart> shoppingCartProducts = shoppingCartRepository.findAll();
    	
    	for(ShoppingCart product : shoppingCartProducts) {
    		if(product.getUser().getEmail().equals(shoppingCartDto.getUserEmail()) &&
    				product.getTicket().getId().equals(shoppingCartDto.getTicketId()) &&
    				product.getStatus().equals("not ordered")){
    			shoppingCartRepository.delete(product);
    		}
    	}
		
    }
	
	public void buyTicketsFromUserShoppingCart(ShoppingCartDto shoppingCartDto) {
    	List<ShoppingCart> shoppingCartProducts = shoppingCartRepository.findAll();
    	
    	for(ShoppingCart product : shoppingCartProducts) {
    		if(product.getUser().getEmail().equals(shoppingCartDto.getUserEmail())){
    			product.setStatus("ordered");
    			shoppingCartRepository.save(product);
    		}
    	}
		
    }
	
	public List<ShoppingCart> getFullShoppingCart() {
		List<ShoppingCart> fullShoppingCart = shoppingCartRepository.findAll();
        List<ShoppingCart> shoppingCart = new ArrayList<>();
        
        if(fullShoppingCart != null) {
            for(ShoppingCart product : shoppingCartRepository.findAll()) {
            	if(product.getStatus().equals("not ordered")) {
            		shoppingCart.add(product);
            	}
            }
        }

        return shoppingCart;
    }
	
	public List<ShoppingCart> getHistoryTransaction() {
		List<ShoppingCart> fullShoppingCart = shoppingCartRepository.findAll();
        List<ShoppingCart> shoppingCart = new ArrayList<>();
        
        if(fullShoppingCart != null) {
            for(ShoppingCart product : shoppingCartRepository.findAll()) {
            	if(product.getStatus().equals("ordered")) {
            		shoppingCart.add(product);
            	}
            }
        }

        return shoppingCart;
    }
}
