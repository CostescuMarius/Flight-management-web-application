package com.flights.account.converter;

import org.springframework.stereotype.Component;

import com.flights.account.dto.PlaneDto;
import com.flights.account.model.Plane;


@Component
public class PlaneConverter {
	
	public PlaneDto entityToDto(Plane plane) {
		
		PlaneDto planeDto = new PlaneDto();
		
		planeDto.setName(plane.getName());
		planeDto.setCapacity(plane.getCapacity());

		
		return planeDto;
	}
	
	
	public Plane dtoToEntity(PlaneDto planeDto) {
	
		Plane plane = new Plane();
		
		plane.setName(planeDto.getName());
		plane.setCapacity(planeDto.getCapacity());
		
		return plane;
	}
}
