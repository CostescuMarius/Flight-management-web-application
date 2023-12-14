import "../css/GlobalStyle.css";
import "../css/ProfileStyle.css";

import React, { useState, useEffect } from "react";
import AppHeader from "../shared/AppHeader.jsx";
import { Grid, LinearProgress } from "@mui/material";
import UserContext from "../context/UserContext.jsx";
import CategoriesCard from "./CategoriesCard.jsx";

/**
 * This component displays the user's profile information.
 *
 * @returns {JSX.Element} The JSX element representing the user profile page.
 */
export default function Customer() {
  // State variable for holding user data
  const [currentUserData, setCurrentUserData] = useState(null);
  
  const [isDataLoadingActive, setIsDataLoadingActive] = useState(true);

  /**
   * Get the current user's data.
   */
  const getUserCurrentData = () => {
    setIsDataLoadingActive(true);

    fetch('api/users/me', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setIsDataLoadingActive(false);

      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setCurrentUserData(data);
    }).catch(error => {
      setIsDataLoadingActive(false);

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
      {/* Main Container */}
      <Grid container direction="column">
        {/* Header Section */}
        {!isDataLoadingActive &&
        <Grid item container>
          <AppHeader showLogoutButton={true} />
        </Grid>}

        <Grid item container>
          <CategoriesCard/>
        </Grid>

      </Grid>
    </UserContext.Provider>
  );
};



