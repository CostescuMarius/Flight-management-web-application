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

import com.flights.account.converter.PlaneConverter;
import com.flights.account.dto.DeletePlaneDto;
import com.flights.account.dto.PlaneDto;
import com.flights.account.model.Plane;
import com.flights.account.service.PlaneService;
import com.flights.account.service.ValidationPlaneService;


@RestController
@RequestMapping("/api/planes")
public class PlaneController {
	
	@Autowired
	private PlaneService planeService;

	@Autowired
	private PlaneConverter planeConverter;
	
	@Autowired
	private ValidationPlaneService validationService;
	

	@PostMapping("/add")
	public PlaneDto addPlane(@RequestBody PlaneDto newPlaneDto){
		validationService.validate(newPlaneDto);
		
		Plane newPlane = planeConverter.dtoToEntity(newPlaneDto);	
		
		Plane addedPlane = planeService.addPlane(newPlane);
		return planeConverter.entityToDto(addedPlane);
	}
	
    @PutMapping("/delete")
    public ResponseEntity<Object> deletePlane(@RequestBody DeletePlaneDto deletePlaneDto) {
        planeService.deletePlane(deletePlaneDto);
        
        return ResponseEntity.ok().build();
    }
	

	@GetMapping("/names")
	public List<String> getAllPlanes() {
		return planeService.getAllPlaneNames();
	}
    
}
	
	

	
