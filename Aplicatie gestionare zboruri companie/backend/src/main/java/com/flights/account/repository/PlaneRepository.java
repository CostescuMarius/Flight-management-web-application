package com.flights.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flights.account.model.Plane;

public interface PlaneRepository extends JpaRepository<Plane, Integer> {	
	boolean existsByName(String name);
	
	public Plane findByName(String name);
	public Plane findById(int id);
	
	public List<Plane> findAll();
}