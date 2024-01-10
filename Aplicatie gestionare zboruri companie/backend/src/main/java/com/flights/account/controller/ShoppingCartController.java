package com.flights.account.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flights.account.converter.ShoppingCartConverter;
import com.flights.account.dto.ShoppingCartDto;
import com.flights.account.model.ShoppingCart;
import com.flights.account.service.ShoppingCartService;
import com.flights.account.service.ValidationService;


@RestController
@RequestMapping("/api/shoppingcart")
public class ShoppingCartController {
	
	@Autowired
	private ShoppingCartService shoppingCartService;

	@Autowired
	private ShoppingCartConverter shoppingCartConverter;
	
//	@Autowired
//	private ValidationService validationService;
	

	@PostMapping("/add")
	public List<ShoppingCartDto> addProductInShoppingCart(@RequestBody ShoppingCartDto newShoppingCartDto){
		ShoppingCart existingItem = shoppingCartService.findByUserEmailAndTicketId(newShoppingCartDto.getUserEmail(), newShoppingCartDto.getTicketId());
		ShoppingCart shoppingCart = shoppingCartConverter.dtoToEntity(newShoppingCartDto);
		
		if(existingItem == null) {
			shoppingCartService.addTicketToShoppingCart(shoppingCart);
		} else {
			existingItem.setCantity(existingItem.getCantity() + 1);
	        shoppingCartService.addTicketToShoppingCart(existingItem);
		}
		
		
		List<ShoppingCart> shoppingCartProducts = shoppingCartService.getFullShoppingCart();
		
		List<ShoppingCartDto> shoppingCartProductsDto = new ArrayList<>();
		for(ShoppingCart product : shoppingCartProducts) {
			shoppingCartProductsDto.add(shoppingCartConverter.entityToDto(product));
		}
		
		return shoppingCartProductsDto;
	}
	
	@PostMapping("/plus")
	public List<ShoppingCartDto> addOneMoreProductInShoppingCart(@RequestBody ShoppingCartDto newShoppingCartDto){
		ShoppingCart existingItem = shoppingCartService.findByUserEmailAndTicketId(newShoppingCartDto.getUserEmail(), newShoppingCartDto.getTicketId());

		existingItem.setCantity(existingItem.getCantity() + 1);
	    shoppingCartService.addTicketToShoppingCart(existingItem);	
		
		List<ShoppingCart> shoppingCartProducts = shoppingCartService.getFullShoppingCart();
		
		List<ShoppingCartDto> shoppingCartProductsDto = new ArrayList<>();
		for(ShoppingCart product : shoppingCartProducts) {
			shoppingCartProductsDto.add(shoppingCartConverter.entityToDto(product));
		}
		
		return shoppingCartProductsDto;
	}
	
	@PostMapping("/minus")
	public List<ShoppingCartDto> removeOneProductFromShoppingCart(@RequestBody ShoppingCartDto newShoppingCartDto){
		ShoppingCart existingItem = shoppingCartService.findByUserEmailAndTicketId(newShoppingCartDto.getUserEmail(), newShoppingCartDto.getTicketId());
	    
	    if(existingItem.getCantity() == 1) {
	    	shoppingCartService.deleteTicketFromShoppingCart(newShoppingCartDto);
	    } else {
	    	existingItem.setCantity(existingItem.getCantity() - 1);
		    shoppingCartService.addTicketToShoppingCart(existingItem);
	    }
		
		List<ShoppingCart> shoppingCartProducts = shoppingCartService.getFullShoppingCart();
		
		List<ShoppingCartDto> shoppingCartProductsDto = new ArrayList<>();
		for(ShoppingCart product : shoppingCartProducts) {
			shoppingCartProductsDto.add(shoppingCartConverter.entityToDto(product));
		}
		
		return shoppingCartProductsDto;
	}
	
    @PostMapping("/delete")
    public List<ShoppingCartDto> deleteProductFromShoppingCart(@RequestBody ShoppingCartDto shoppingCartDto) {

    	shoppingCartService.deleteTicketFromShoppingCart(shoppingCartDto);
        
    	List<ShoppingCart> shoppingCartProducts = shoppingCartService.getFullShoppingCart();
		
		List<ShoppingCartDto> shoppingCartProductsDto = new ArrayList<>();
		for(ShoppingCart product : shoppingCartProducts) {
			shoppingCartProductsDto.add(shoppingCartConverter.entityToDto(product));
		}
		
		return shoppingCartProductsDto;
    }
	

	@GetMapping("/all")
	public List<ShoppingCartDto> getShoppingCart() {
		List<ShoppingCart> shoppingCartProducts = shoppingCartService.getFullShoppingCart();
		
		List<ShoppingCartDto> shoppingCartProductsDto = new ArrayList<>();
		for(ShoppingCart product : shoppingCartProducts) {
			shoppingCartProductsDto.add(shoppingCartConverter.entityToDto(product));
		}
		
		return shoppingCartProductsDto;
	}
    
}
	
	

	
