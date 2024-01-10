package com.flights.account.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.flights.account.model.ShoppingCart;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Integer> {

	public List<ShoppingCart> findAll();
	
	public ShoppingCart findByUserEmail(String email);
	public ShoppingCart findByTicketId(int id);
	
	public ShoppingCart findByUserEmailAndTicketIdAndStatus(String email, int id, String Status);
}
