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

export default function HistorySection({ showMessage }) {
  const userContext = useContext(UserContext);
  const currentUserData = userContext.currentUserData;

  const [allAirports, setAllAirports] = useState(null);

  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
  const [historyTransaction, setHistoryTransaction] = useState(null);

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

  const getHistroyTransaction = () => {
    setIsDataLoadingActive(true);

    fetch('api/shoppingcart/history', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setHistoryTransaction(data);
    }).catch(error => {

      setSnackbarMessage(error.message);

      setShowSnackbar(true);
    });
  }

  useEffect(() => {
    getAllTickets();
    getHistroyTransaction();
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item container direction="column" gap='20px'>
        <Grid item container direction="column" gap='12px'>
          <Grid item>
            <Typography variant="subtitle1">
              History Transaction
            </Typography>
          </Grid>
        </Grid>

        {historyTransaction && historyTransaction.length > 0 &&
          <Grid item container direction="column" gap='20px'>
            {historyTransaction.map((transaction, index) => {
              //const isTicketInHistory = historyTransaction.some(item => item.ticketId === ticket.ticketId && item.userEmail === currentUserData.email);

              const correspondingTicket = ticketsData.find(ticket => ticket.ticketId === transaction.ticketId);
              const isCurrentUserTransaction = transaction.userEmail === currentUserData.email;

              if (isCurrentUserTransaction) {
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
                          <span style={{ fontWeight: 'bold' }}>From</span> {correspondingTicket.departureAirportName} ({correspondingTicket.departureLocation}) →
                          <span style={{ fontWeight: 'bold' }}> To </span> {correspondingTicket.arrivalAirportName} ({correspondingTicket.arrivalLocation})
                        </Typography>
                      </Grid>

                      <Grid item container style={{ width: "fit-content" }} gap="10px">             
                        <Grid item style={{ fontSize: 'larger', fontWeight: 'bold' }}>
                          {transaction.cantity}
                        </Grid>

                        <Grid item>
                          <AirplaneTicketIcon fontSize="large" />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}> Date </span>
                        {dayjs(correspondingTicket.departureDate).format('DD MMM YYYY')}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}> Interval </span>
                        {dayjs(correspondingTicket.departureDate).format('HH:mm A')} -
                        {dayjs(correspondingTicket.arrivalDate).format(' HH:mm A')}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        <span style={{ fontWeight: 'bold' }}> Type </span>
                        {correspondingTicket.type}
                      </Typography>
                    </Grid>

                    <Grid item container justifyContent='space-between' direction='row'>
                      <Grid item container style={{ width: 'auto' }}>
                        <Grid item>
                          <Typography variant="body1">
                            <span style={{ fontWeight: 'bold' }}> Price </span>
                            <span style={{ color: 'green' }}> {transaction.cantity} x {correspondingTicket.price}$ = {transaction.cantity * correspondingTicket.price}$</span>
                          </Typography>
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
