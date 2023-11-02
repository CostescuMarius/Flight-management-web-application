package com.flights.account.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flights.account.dto.DeleteAirportDto;
import com.flights.account.exception.AccountException;
import com.flights.account.exception.AirportException;
import com.flights.account.exception.InternalErrorCode;
import com.flights.account.exception.PlaneException;
import com.flights.account.messages.Message;
import com.flights.account.model.Airport;
import com.flights.account.repository.AirportRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AirportService {
	@Autowired
	private AirportRepository airportRepository;

	
	public Airport addAirport(Airport newAirport) {
		if(airportRepository.existsByName(newAirport.getName())) {
            throw new AccountException(Message.AIRPORT_ALREADY_EXISTS, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
        }
		
		newAirport.setName(newAirport.getName());
		newAirport.setLocation(newAirport.getLocation());
		
		newAirport = airportRepository.save(newAirport);
		
		return newAirport;
	}
	
	
	public void deleteAirport(DeleteAirportDto deleteAirportDto) {
        String airportName = deleteAirportDto.getName();
        
		if(!airportRepository.existsByName(airportName)) {
            throw new AccountException(Message.AIRPORT_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
        }
        
		Airport airportToDelete = airportRepository.findByName(airportName);
		
		airportRepository.delete(airportToDelete);
    }
	
    public List<String> getAllAirportsName() {
    	List<Airport> airports = airportRepository.findAll();

    	List<String> airportsName = new ArrayList<>();

        for (Airport airport : airports) {
        	airportsName.add(airport.getName());
        }

        return airportsName;
    }
}
