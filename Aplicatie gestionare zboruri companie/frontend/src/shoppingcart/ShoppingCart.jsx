import "../css/GlobalStyle.css";
import "../css/ProfileStyle.css";

import React, { useState, useEffect } from "react";
import AppHeader from "../shared/AppHeader.jsx";
import { Grid } from "@mui/material";
import UserContext from "../context/UserContext.jsx";
import ShoppingCartCard from "./ShoppingCartCard.jsx";


export default function Wishlist() {
  const [currentUserData, setCurrentUserData] = useState(null);
  
  const [isDataLoadingActive, setIsDataLoadingActive] = useState(true);

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


  useEffect(() => {
    getUserCurrentData();
  }, []);


  return (
    <UserContext.Provider value={{ currentUserData }}>
      <Grid container direction="column">
        {!isDataLoadingActive &&
        <Grid item container>
          <AppHeader showLogoutButton={true} />
        </Grid>}

        <Grid item container>
          <ShoppingCartCard />
        </Grid>

      </Grid>
    </UserContext.Provider>
  );
};



