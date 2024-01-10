package com.flights.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flights.account.model.UserTicket;


public interface UserTicketRepository extends JpaRepository<UserTicket, Integer> {
//	boolean existsByEmail(String email);
//
//	public User findByEmail(String email);

	public List<UserTicket> findAll();
	
	public UserTicket findByUserEmail(String email);
	public UserTicket findByTicketId(int id);
	
//	public User findById(int id);
}
