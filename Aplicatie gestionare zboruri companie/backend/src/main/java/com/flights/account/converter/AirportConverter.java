package com.flights.account.converter;

import org.springframework.stereotype.Component;

import com.flights.account.dto.AirportDto;
import com.flights.account.model.Airport;


@Component
public class AirportConverter {
	
	public AirportDto entityToDto(Airport airport) {
		
		AirportDto airportDto = new AirportDto();
		
		airportDto.setName(airport.getName());
		airportDto.setLocation(airport.getLocation());

		return airportDto;
	}
	
	
	public Airport dtoToEntity(AirportDto airportDto) {
	
		Airport airport = new Airport();
		
		airport.setName(airportDto.getName());
		airport.setLocation(airportDto.getLocation());
		
		return airport;
	}
}
