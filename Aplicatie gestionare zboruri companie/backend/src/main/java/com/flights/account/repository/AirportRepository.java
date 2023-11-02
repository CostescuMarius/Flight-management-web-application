package com.flights.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flights.account.model.Airport;

public interface AirportRepository extends JpaRepository<Airport, Integer> {	
	boolean existsByName(String name);
	
	public Airport findByName(String name);
	
	public List<Airport> findAll();
}