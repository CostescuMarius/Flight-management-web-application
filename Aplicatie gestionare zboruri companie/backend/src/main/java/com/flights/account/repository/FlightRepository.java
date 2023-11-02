package com.flights.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flights.account.model.Airport;
import com.flights.account.model.Flight;
import com.flights.account.model.Plane;

public interface FlightRepository extends JpaRepository<Flight, Integer> {	
	public boolean existsById(int id);
	
	public Flight findById(int id);
	
	public Flight existsByPlane(Plane plane);
	public Flight existsByDepartureAirport(Airport airport);
	public Flight existsByArrivalAirport(Airport airport);
	
	public List<Flight> findAll();
}