package com.flights.account.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.flights.account.dto.DeletePlaneDto;
import com.flights.account.exception.InternalErrorCode;
import com.flights.account.exception.PlaneException;
import com.flights.account.messages.Message;
import com.flights.account.model.Plane;
import com.flights.account.repository.PlaneRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PlaneService {
	@Autowired
	private PlaneRepository planeRepository;

	
	public Plane addPlane(Plane newPlane) {
		if(planeRepository.existsByName(newPlane.getName())) {
            throw new PlaneException(Message.PLANE_ALREADY_EXISTS, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
        }
		
		newPlane = planeRepository.save(newPlane);
		
		return newPlane;
	}
	
	
	public void deletePlane(DeletePlaneDto deletePlaneDto) {
        String planeName = deletePlaneDto.getName();
        
		if(!planeRepository.existsByName(planeName)) {
            throw new PlaneException(Message.PLANE_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
        }
        
		Plane planeToDelete = planeRepository.findByName(planeName);
		
        planeRepository.delete(planeToDelete);
    }
	
    public List<String> getAllPlanesName() {
    	List<Plane> planes = planeRepository.findAll();

    	List<String> planesName = new ArrayList<>();

        for (Plane plane : planes) {
            planesName.add(plane.getName());
        }

        return planesName;
    }
    
    public Plane getPlaneById(int id) {
    	if(!planeRepository.existsById(id)) {
    		throw new PlaneException(Message.PLANE_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
    	}
    	
    	return planeRepository.findById(id);
    }
    
    public Plane getPlaneByName(String name) {
    	if(!planeRepository.existsByName(name)) {
    		throw new PlaneException(Message.PLANE_NOT_FOUND, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
    	}
    	
    	return planeRepository.findByName(name);
    }
}
