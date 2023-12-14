import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete, IconButton } from "@mui/material";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import UserContext from "../context/UserContext.jsx";

export default function WishlistSection({ showMessage }) {
    const userContext = useContext(UserContext);
    const currentUserData = userContext.currentUserData;

    const [allAirports, setAllAirports] = useState(null);

    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
    const [wishlist, setWishlist] = useState(null);

    const [isCheckLoading, setIsCheckLoading] = useState(false);
    const [ticketsData, setTicketData] = useState(null);

    const [isDataLoadingActive, setIsDataLoadingActive] = useState(false);

    const getAllTickets = () => {
        setIsDataLoadingActive(true);
    
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
        setIsDataLoadingActive(true);
    
        fetch('api/wishlist/all', {
          method: 'GET'
        }).then((response) => {
          return response.json();
        }).then((data) => {
          if (data.errorMessage) {
            throw new Error(data.errorMessage);
          }
    
          setWishlist(data);
        }).catch(error => {
    
          setSnackbarMessage(error.message);
    
          setShowSnackbar(true);
        });
      }

    useEffect(() => {
        getAllTickets();
        getWishlist();
    }, []);

    const handleClickDeleteFromWishlist = (ticketId) => {
        const checkInfo = {
            userEmail: currentUserData.email,
            ticketId: ticketId,
        };


        fetch('api/wishlist/delete', {
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

            setWishlist(data);
            showMessage(true, "Ticket deleted from wishlist.");
        }).catch(error => {
            setIsCheckLoading(false);

            showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item container direction="column" gap='20px'>
            <Grid item container direction="column" gap='12px'>
              <Grid item>
                <Typography variant="subtitle1">
                  Wishlist
                </Typography>
              </Grid>
            </Grid>
      
            {ticketsData && ticketsData.length > 0 && 
              <Grid item container direction="column" gap='20px'>
                {ticketsData.map((ticket, index) => {
                  const isTicketInWishlist = wishlist.some(item => item.ticketId === ticket.ticketId && item.userEmail === currentUserData.email);
      
                  if (isTicketInWishlist) {
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
      
                          <Grid item>
                            <AirplaneTicketIcon fontSize="large" />
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
                                <span style={{ fontWeight: 'bold'}}> Price </span>
                                <span style={{ color: 'green' }}> {ticket.price}$ </span>
                              </Typography>
                            </Grid>
                          </Grid>
      
                          <Grid item container justifyContent='flex-end' gap='15px' style={{ width: 'auto' }}>
                            <Grid item>
                              <IconButton color='secondary' onClick={() => handleClickDeleteFromWishlist(ticket.ticketId)}>
                                <FavoriteIcon />
                              </IconButton>
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
      
          </Grid>
        </LocalizationProvider>
      );
}
