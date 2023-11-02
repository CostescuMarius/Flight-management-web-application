package com.flights.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flights.account.model.Flight;
import com.flights.account.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {	
	public boolean existsById(int id);
	
	public Ticket findById(int id);
	
	public Ticket existsByFlight(Flight flight);

	public List<Ticket> findAll();
}