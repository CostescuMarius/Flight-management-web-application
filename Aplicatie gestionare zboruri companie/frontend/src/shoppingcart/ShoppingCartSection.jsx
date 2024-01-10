import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete, IconButton } from "@mui/material";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import UserContext from "../context/UserContext.jsx";

export default function ShoppingCartSection({ showMessage, switchSection }) {
  const userContext = useContext(UserContext);
  const currentUserData = userContext.currentUserData;

  const [shoppingCart, setShoppingCart] = useState(null);
  const [ticketsData, setTicketData] = useState(null);

  const getAllTickets = () => {
    fetch('api/tickets/alltickets', {
      method: 'POST'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setTicketData(data);
    }).catch(error => {

      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }

  const getWishlist = () => {
    fetch('api/shoppingcart/all', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setShoppingCart(data);
    }).catch(error => {

      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }

  useEffect(() => {
    getAllTickets();
    getWishlist();
  }, []);

  const handleClickRemoveProduct = (ticketId) => {
    const checkInfo = {
      userEmail: currentUserData.email,
      ticketId: ticketId,
    };


    fetch('api/shoppingcart/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkInfo),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setShoppingCart(data);
      showMessage(true, "Product removed from shopping cart.");
    }).catch(error => {
      setIsCheckLoading(false);

      showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
    })
  }

  const handleClickAddOneMoreTicket = (ticketId) => {
    const checkInfoShoppingCart = {
      userEmail: currentUserData.email,
      ticketId: ticketId,
      cantity: 1,
    };


    fetch('api/shoppingcart/plus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkInfoShoppingCart),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }
      console.log(data);

      setShoppingCart(data);
      showMessage(true, "One more ticket has added to shopping cart.");
    }).catch(error => {
      setIsCheckLoading(false);

      showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
    })
  }

  const handleClickRemoveOneTicket = (ticketId) => {
    const checkInfoShoppingCart = {
      userEmail: currentUserData.email,
      ticketId: ticketId,
      cantity: 1,
    };


    fetch('api/shoppingcart/minus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkInfoShoppingCart),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setShoppingCart(data);
      showMessage(true, "One ticket has removed from shopping cart.");
    }).catch(error => {
      setIsCheckLoading(false);

      showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
    })
  }

  let totalPrice = 0;
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item container direction="column" gap='20px'>
        <Grid item container direction="column" gap='12px'>
          <Grid item>
            <Typography variant="subtitle1">
              Shopping Cart
            </Typography>
          </Grid>
        </Grid>

        {ticketsData && ticketsData.length > 0 &&
          <Grid item container direction="column" gap='20px'>
            {ticketsData.map((ticket, index) => {
              const isTicketInShoppingCart = shoppingCart.some(item => item.ticketId === ticket.ticketId && item.userEmail === currentUserData.email);

              if (isTicketInShoppingCart) {
                const shoppingCartItem = shoppingCart.find(item => item.ticketId === ticket.ticketId && item.userEmail === currentUserData.email);
                const currentTicketCost = ticket.price * shoppingCartItem.cantity;
                totalPrice += currentTicketCost;
                return (
                  <Grid
                    item
                    container
                    key={index}
                    direction="column"
                    gap='10px'
                    style={{
                      backgroundColor: '#ADD8E6',
                      border: '1px solid black',
                      borderRadius: '8px',
                      padding: '10px',
                    }}
                  >

                    <Grid item container justifyContent='space-between'>
                      <Grid item>
                        <Typography variant="body1" style={{ color: 'black' }}>
                          <span style={{ fontWeight: 'bold' }}>From</span> {ticket.departureAirportName} ({ticket.departureLocation}) →
                          <span style={{ fontWeight: 'bold' }}> To </span> {ticket.arrivalAirportName} ({ticket.arrivalLocation})
                        </Typography>
                      </Grid>

                      <Grid item container style={{ width: "fit-content" }} gap="10px">
                        <Grid item container alignItems="center" style={{ width: "fit-content" }} gap="3px">
                          <Grid item fontSize="small">
                            <IconButton
                              color='error'
                              onClick={() => handleClickRemoveOneTicket(ticket.ticketId)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Grid>


                          <Grid item style={{ fontSize: 'larger', fontWeight: 'bold' }}>
                            {shoppingCartItem.cantity}
                          </Grid>

                          <Grid item fontSize="small">
                            <IconButton
                              color="success"
                              onClick={() => handleClickAddOneMoreTicket(ticket.ticketId)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <AirplaneTicketIcon fontSize="large" />
                        </Grid>
                      </Grid>

                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}> Date </span>
                        {dayjs(ticket.departureDate).format('DD MMM YYYY')}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}> Interval </span>
                        {dayjs(ticket.departureDate).format('HH:mm A')} -
                        {dayjs(ticket.arrivalDate).format(' HH:mm A')}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}> Type </span>
                        {ticket.type}
                      </Typography>
                    </Grid>

                    <Grid item container justifyContent='space-between' direction='row'>
                      <Grid item container style={{ width: 'auto' }}>
                        <Grid item>
                          <Typography variant="body1">
                            <span style={{ fontWeight: 'bold' }}> Price </span>
                            <span style={{ color: 'green' }}> {shoppingCartItem.cantity} x {ticket.price}$ = {ticket.price * shoppingCartItem.cantity}$ </span> 
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item container justifyContent='flex-end' gap='15px' style={{ width: 'auto' }}>
                        <Grid item>
                          <Button
                            color='error'
                            variant="contained"
                            onClick={() => handleClickRemoveProduct(ticket.ticketId)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                );
              }

              return null; // Skip rendering if the ticket is not in the wishlist
            })}
          </Grid>
        }

        {ticketsData && shoppingCart.some(item => item.userEmail === currentUserData.email) &&
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                endIcon={<NavigateNextIcon />}
                onClick={() => switchSection("orderForm")}
              >
                Continue {totalPrice}$
              </Button>
            </Grid>

          </Grid>}

      </Grid>
    </LocalizationProvider>
  );
}
