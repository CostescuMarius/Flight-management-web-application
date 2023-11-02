package com.flights.account.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flights.account.dto.DeleteFlightDto;
import com.flights.account.dto.UpdateFlightDto;
import com.flights.account.exception.AccountException;
import com.flights.account.exception.InternalErrorCode;
import com.flights.account.messages.Message;
import com.flights.account.model.Flight;
import com.flights.account.repository.FlightRepository;
import com.flights.account.repository.PlaneRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class FlightService {
	@Autowired
	private FlightRepository flightRepository;

	@Autowired
	private PlaneRepository planeRepository;
	
	public Flight addFlight(Flight newFlight) {
		newFlight = flightRepository.save(newFlight);
		
		return newFlight;
	}
	
	
	public void deleteFlight(DeleteFlightDto deleteFlightDto) {
        int flightId = deleteFlightDto.getId();
        
		if(!flightRepository.existsById(flightId)) {
            throw new AccountException(Message.FLIGHT_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
        }
        
		Flight flightToDelete = flightRepository.findById(flightId);
		
		flightRepository.delete(flightToDelete);
    }
	
	public Flight updateFlight(UpdateFlightDto newFlight) {
		Flight currentFlight = flightRepository.findById(newFlight.getId());
		
		currentFlight.setPlane(planeRepository.findByName(newFlight.getPlaneName()));
		currentFlight.setDepartureDate(newFlight.getDepartureDate());
		currentFlight.setArrivalDate(newFlight.getArrivalDate());
	    
		flightRepository.save(currentFlight);
	    
	    return currentFlight;
	}

    public List<String> getAllFlightsDetails() {
    	List<Flight> flights = flightRepository.findAll();

    	List<String> airportsName = new ArrayList<>();

        for (Flight flight : flights) {
        	airportsName.add(flight.getId() + "   Plane: " + flight.getPlane().getName() +
        			"   From: " + flight.getDepartureAirport().getLocation() +
        			" To: " + flight.getArrivalAirport().getLocation() + 
        			"   Data: " + flight.getDepartureDate() + "<->" + flight.getArrivalDate());
        }

        return airportsName;
    }
}
