package com.flights.account;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FlightsManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightsManagementApplication.class, args);
	}

}
