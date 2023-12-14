import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete, IconButton } from "@mui/material";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function BuyTicketSection({ showMessage }) {
    const [currentUserData, setCurrentUserData] = useState(null);
    const [isDataLoadingActive, setIsDataLoadingActive] = useState(true);

    const [allAirports, setAllAirports] = useState(null);

    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
    const [wishlist, setWishlist] = useState(null);

    const [isCheckLoading, setIsCheckLoading] = useState(false);
    const [ticketsData, setTicketData] = useState(null);

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

    const getAllAirportsName = () => {

        fetch('api/airports/names', {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.errorMessage) {
                throw new Error(data.errorMessage);
            }

            setAllAirports(data);
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
        getAllAirportsName();
        getUserCurrentData();
        getWishlist();
    }, []);

    const handleCheckClick = () => {
        setIsCheckLoading(true);

        const checkInfo = {
            departureAirportName: departureAirport.trim(),
            arrivalAirportName: arrivalAirport.trim(),
            departureDate: selectedDepartureDate.toISOString(),
        };


        fetch('api/tickets/check', {
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
            setTicketData(data);

            setIsCheckLoading(false);

            const numberOfTickets = data.length;
            const message = 'Found ' + numberOfTickets + ' tickets.';
            showMessage(true, message);
        }).catch(error => {
            setIsCheckLoading(false);

            showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        })
    };

    const handleDepartureDateChange = (newDate) => {
        setSelectedDepartureDate(newDate);
    };

    const handleClickAddToWishlist = (ticketId) => {
        const checkInfo = {
            userEmail: currentUserData.email,
            ticketId: ticketId,
        };


        fetch('api/wishlist/add', {
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
            showMessage(true, "Ticket added to wishlist.");
        }).catch(error => {
            setIsCheckLoading(false);

            showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        })
    }

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
                            Buy Ticket
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Autocomplete
                            fullWidth
                            onChange={(event, value) => setDepartureAirport(value || '')}
                            options={allAirports == null ? [] : allAirports}
                            renderInput={(params) => (
                                <TextField {...params} label="Departure Airport" variant="outlined" />
                            )}
                        />
                    </Grid>

                    <Grid item>
                        <Autocomplete
                            fullWidth
                            onChange={(event, value) => setArrivalAirport(value || '')}
                            options={allAirports == null ? [] : (departureAirport == '' ? allAirports : allAirports.filter(airport => airport !== departureAirport))}
                            renderInput={(params) => (
                                <TextField {...params} label="Arrival Airport" variant="outlined" />
                            )}
                        />
                    </Grid>

                    <Grid item container alignItems='center' gap='13px'>
                        <Grid item>
                            <Typography sx={{ color: 'gray' }} variant="subtitle1">
                                Departure Date:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <DateTimePicker
                                views={['year', 'month', 'day']}
                                value={selectedDepartureDate}
                                onChange={handleDepartureDateChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid item container justifyContent="flex-end" gap='10px'>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleCheckClick}
                            >
                                Check Ticket
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {isCheckLoading &&
                    <Grid item xs>
                        <LinearProgress />
                    </Grid>
                }

                {ticketsData && ticketsData.length > 0 &&
                    <Grid item container direction="column" gap='20px'>
                        <Typography variant="subtitle1">Available Tickets:</Typography>

                        {ticketsData.map((ticket, index) => (
                            <Grid item container
                                key={index}
                                direction="column"
                                gap='10px'
                                style={{
                                    backgroundColor: '#ADD8E6',
                                    border: '1px solid black',
                                    borderRadius: '8px',
                                    padding: '10px',
                                }}>

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
                                            <Button variant="contained" color="primary">
                                                BUY
                                            </Button>
                                        </Grid>

                                        {wishlist &&
                                            <Grid item>
                                                {wishlist.some(item => item.userEmail === currentUserData.email && item.ticketId === ticket.ticketId) ? (
                                                    <IconButton color='secondary' onClick={() => handleClickDeleteFromWishlist(ticket.ticketId)}>
                                                        <FavoriteIcon />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton color='secondary' onClick={() => handleClickAddToWishlist(ticket.ticketId)}>
                                                        <FavoriteBorderIcon />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>

                            </Grid>
                        ))}
                    </Grid>
                }

            </Grid>
        </LocalizationProvider>
    );
}
