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

import com.flights.account.converter.AirportConverter;
import com.flights.account.dto.AirportDto;
import com.flights.account.dto.DeleteAirportDto;
import com.flights.account.model.Airport;
import com.flights.account.service.AirportService;
import com.flights.account.service.ValidationService;


@RestController
@RequestMapping("/api/airports")
public class AirportController {
	
	@Autowired
	private AirportService airportService;

	@Autowired
	private AirportConverter airportConverter;
	
	@Autowired
	private ValidationService validationService;
	

	@PostMapping("/add")
	public AirportDto addAirport(@RequestBody AirportDto newAirportDto){
		validationService.validate(newAirportDto);
		
		Airport newAirport = airportConverter.dtoToEntity(newAirportDto);	
		
		Airport addedAirport = airportService.addAirport(newAirport);
		return airportConverter.entityToDto(addedAirport);
	}
	
    @PutMapping("/delete")
    public ResponseEntity<Object> deleteAirport(@RequestBody DeleteAirportDto deleteAirportDto) {
    	airportService.deleteAirport(deleteAirportDto);
        
        return ResponseEntity.ok().build();
    }
	

	@GetMapping("/names")
	public List<String> getAllAirports() {
		return airportService.getAllAirportsName();
	}
    
}
	
	

	
