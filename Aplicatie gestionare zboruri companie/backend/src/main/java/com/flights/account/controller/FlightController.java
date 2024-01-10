package com.flights.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flights.account.converter.FlightConverter;
import com.flights.account.dto.DeleteFlightDto;
import com.flights.account.dto.FlightDto;
import com.flights.account.dto.UpdateFlightDto;
import com.flights.account.model.Flight;
import com.flights.account.service.FlightService;


@RestController
@RequestMapping("/api/flights")
public class FlightController {
	
	@Autowired
	private FlightService flightService;

	@Autowired
	private FlightConverter flightConverter;
	

	@PostMapping("/add")
	public FlightDto addFlight(@RequestBody FlightDto newFlightDto){
		
		Flight newFlight = flightConverter.dtoToEntity(newFlightDto);	
		
		Flight addedFlight = flightService.addFlight(newFlight);
		return flightConverter.entityToDto(addedFlight);
	}
	
    @PutMapping("/delete")
    public ResponseEntity<Object> deleteFlight(@RequestBody DeleteFlightDto deleteFlightDto) {
    	flightService.deleteFlight(deleteFlightDto);
        
        return ResponseEntity.ok().build();
    }
	

	@GetMapping("/details")
	public List<String> getAllPlanes() {
		return flightService.getAllFlightsDetails();
	}
	
    @PutMapping("/update")
    public FlightDto updateUserName(@RequestBody UpdateFlightDto newFlight) {
    	Flight updatedFlight = flightService.updateFlight(newFlight);
        return flightConverter.entityToDto(updatedFlight);
    }
    
}
	
	

	
