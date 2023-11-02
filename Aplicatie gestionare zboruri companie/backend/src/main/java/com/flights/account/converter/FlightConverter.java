package com.flights.account.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flights.account.dto.FlightDto;
import com.flights.account.model.Flight;
import com.flights.account.service.AirportService;
import com.flights.account.service.PlaneService;


@Component
public class FlightConverter {
	@Autowired
	private PlaneService planeService;
	
	@Autowired
	private AirportService airportService;
	
	public FlightDto entityToDto(Flight flight) {
		
		FlightDto flightDto = new FlightDto();
		
		flightDto.setPlaneName(flight.getPlane().getName());
		flightDto.setDepartureAirportName(flight.getDepartureAirport().getName());
		flightDto.setArrivalAirportName(flight.getArrivalAirport().getName());
		flightDto.setDepartureDate(flight.getDepartureDate());
		flightDto.setArrivalDate(flight.getArrivalDate());

		return flightDto;
	}
	
	
	public Flight dtoToEntity(FlightDto flightDto) {
		Flight flight = new Flight();
		
		
		flight.setPlane(planeService.getPlaneByName(flightDto.getPlaneName()));
		flight.setDepartureAirport(airportService.getAirportByName(flightDto.getDepartureAirportName()));
		flight.setArrivalAirport(airportService.getAirportByName(flightDto.getArrivalAirportName()));
		flight.setDepartureDate(flightDto.getDepartureDate());
		flight.setArrivalDate(flightDto.getArrivalDate());
		
		return flight;
	}
}
