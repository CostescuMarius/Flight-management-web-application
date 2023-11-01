import "../css/GlobalStyle.css";

import React, { useState, useEffect } from "react";
import AppHeader from "../shared/AppHeader.jsx";
import UserContext from "../context/UserContext.jsx";

import { Grid } from "@mui/material";
import EmployeeCard from "./EmployeeCard.jsx";


export default function Employee() {
  // State variable for holding user data
  const [currentUserData, setCurrentUserData] = useState(null);

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

  /**
  * Fetch user data on component mount
  */
  useEffect(() => {
    getUserCurrentData();
  }, []);

  return (
    <UserContext.Provider value={{ currentUserData }}>

      <Grid container direction="column">
        {/* Header Section */}
        <Grid item container>
          <AppHeader showLogoutButton={true} />
        </Grid>

        <Grid item container>
            <EmployeeCard />
        </Grid>
      </Grid>
    </UserContext.Provider>
  );
};



