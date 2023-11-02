import "../css/GlobalStyle.css";

import React, { useState, useEffect } from "react";
import AppHeader from "../shared/AppHeader.jsx";
import UserContext from "../context/UserContext.jsx";

import { Grid, Snackbar, Alert } from "@mui/material";
import EmployeeCard from "./EmployeeCard.jsx";

import CompanyContext from "../context/CompanyContext.jsx";


export default function Employee() {
  // State variable for holding user data
  const [currentUserData, setCurrentUserData] = useState(null);

  const [allPlanesName, setAllPlanesName] = useState(null);
  const [allAirportsName, setAllAirportsName] = useState(null);
  const [allFlightsDetails, setAllFlightsDetails] = useState(null);
  const [allTicketsDetails, setAllTicketsDetails] = useState(null);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  /**
   * Get the current user's data.
   */
  const getUserCurrentData = () => {

    fetch('api/users/me', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {

      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setCurrentUserData(data);
    }).catch(error => {

      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }


  const getAllPlanesName = () => {

    fetch('api/planes/names', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setAllPlanesName(data);
    }).catch(error => {
      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }

  const getAllAirportsName = () => {

    fetch('api/airports/names', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setAllAirportsName(data);
    }).catch(error => {
      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }

  const getAllFlightsDetails = () => {

    fetch('api/flights/details', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setAllFlightsDetails(data);
    }).catch(error => {
      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }

  const getAllTicketsDetails = () => {

    fetch('api/tickets/details', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setAllTicketsDetails(data);
    }).catch(error => {
      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }

  /**
  * Fetch user data on component mount
  */
  useEffect(() => {
    getUserCurrentData();
    getAllPlanesName();
    getAllAirportsName();
    getAllFlightsDetails();
    getAllTicketsDetails();
  }, []);

  const refreshPlanes = () => {
    getAllPlanesName();
  }

  const refreshAirports = () => {
    getAllAirportsName();
  }

  const refreshFlights = () => {
    getAllFlightsDetails();
  }

  const refreshTickets = () => {
    getAllTicketsDetails();
  }

  return (
    <Grid container direction="column">
      <UserContext.Provider value={{ currentUserData }}>
        {/* Header Section */}
        <Grid item container>
          <AppHeader showLogoutButton={true} />
        </Grid>
      </UserContext.Provider>

      <CompanyContext.Provider value={{ allPlanesName, allAirportsName, allFlightsDetails, allTicketsDetails }}>
        <Grid item container>
          <EmployeeCard 
            refreshPlanes={refreshPlanes} 
            refreshAirports={refreshAirports}
            refreshFlights={refreshFlights}
            refreshTickets={refreshTickets}
          />
        </Grid>
      </CompanyContext.Provider>

      {showSnackbar &&
        <Grid item>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity='error'
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>}
    </Grid>


  );
};



