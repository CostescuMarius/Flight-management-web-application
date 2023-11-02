import React from "react";

import { useState, useContext } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CompanyContext from "../context/CompanyContext.jsx";

export default function TicketSection({ showMessage, refreshTickets }) {
    const [isAddTicketActive, setIsAddTicketActive] = useState(false);
    const [isDeleteTicketActive, setIsDeleteTicketActive] = useState(false);
    const [isUpdateTicketActive, setIsUpdateTicketActive] = useState(false);
    

    const [isAddLoading, setIsAddLoading] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const companyContext = useContext(CompanyContext);
    const allFlightsDetails = companyContext.allFlightsDetails;
    const allTicketsDetails = companyContext.allTicketsDetails;

    const [flightForTicket, setFlightForTicket] = useState('');
    const [typeForTicket, setTypeForTicket] = useState('');
    const [addedPrice, setAddedPrice] = useState('');

    
    const [ticketForUpdate, setTicketForUpdate] = useState('');
    const [updatedPrice, setUdatedPrice] = useState('');

    const [ticketForDelete, setTicketForDelete] = useState('');

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === "add-price") {
            setAddedPrice(value);
        } else if (id === "update-price") {
            setUdatedPrice(value);
        }
    }

    const handleAddClick = () => {
        setIsAddTicketActive(true);
    }

    const handleDeleteClick = () => {
        setIsDeleteTicketActive(true);
    }

    const handleUpdateClick = () => {
        setIsUpdateTicketActive(true);
    }

    const handleCancelAddClick = () => {
        setIsAddTicketActive(false);
    }

    const handleCancelDeleteClick = () => {
        setIsDeleteTicketActive(false);
    }

    const handleCancelUpdateClick = () => {
        setIsUpdateTicketActive(false);
    }

    const sendAddTicketRequest = () => {
        setIsAddLoading(true);

        const tickeInfo = {
            flightId: flightForTicket.trim(),
            type: typeForTicket.toString(),
            price: addedPrice,
        };

        return fetch('api/tickets/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tickeInfo),
        }).then((response) => {
            if (response.ok) {
                setIsAddLoading(false);
                setIsAddTicketActive(false);

                setFlightForTicket('');
                setTypeForTicket('');
                setAddedPrice('');

                showMessage(true, 'The ticket has been added successfully');
            }
            return response.json();
        }).then((data) => {
            if (data.errors) {
                throw new Error(data.errors[0].errorMessage); 
            } else if (data.errorMessage) {
                throw new Error(data.errorMessage);
            }
        }).catch(error => {
            setIsAddLoading(false);

            showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        })
    };

    const handleSaveAddClick = async () => {
        await sendAddTicketRequest()
        refreshTickets();
    }

    const sendUpdateTicketRequest = () => {
        setIsUpdateLoading(true);

        const newTicketInfo = {
            id: ticketForUpdate.trim(),
            price: updatedPrice.trim(),
        };

        return fetch('api/tickets/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTicketInfo),
        }).then((response) => {
            if (response.ok) {
                setIsUpdateLoading(false);
                setIsUpdateTicketActive(false);

                setUdatedPrice('');
                setTicketForUpdate('');

                showMessage(true, 'The ticket has been updated successfully');
            }
            return response.json();
        }).then((data) => {
            if (data.errors) {
                throw new Error(data.errors[0].errorMessage); 
            } else if (data.errorMessage) {
                throw new Error(data.errorMessage);
            }
        }).catch(error => {
            setIsAddLoading(false);

            showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        })
    };

    const handleSaveUpdateClick = async () => {
        await sendUpdateTicketRequest()
        refreshTickets();
    }

    const sendDeleteTicketRequest = () => {
        setIsDeleteLoading(true);

        const deletedTicketInfo = {
            id: ticketForDelete.trim(),
        };

        return fetch('api/tickets/delete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedTicketInfo),
        }).then((response) => {
            if (response.status === 200 || response.status === 204) {
                setIsDeleteLoading(false);
                setIsDeleteTicketActive(false);

                setTicketForDelete('');

                showMessage(true, 'The ticket has been deleted successfully');
            } else {
                return response.json();
            }

        }).then((data) => {
            if(data) {
                if (data.errors) {
                    throw new Error(data.errors[0].errorMessage); 
                } else if (data.errorMessage) {
                    throw new Error(data.errorMessage);
                }
            }
        }).catch(error => {
            setIsDeleteLoading(false);

            showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        })
    };

    const handleSaveDeleteClick = async () => {
        await sendDeleteTicketRequest()
        refreshTickets();
    }

    const types = [ 'Full',  'Student', 'Child' ];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item container direction='column' gap='20px'>
                {(isAddTicketActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Add Ticket
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setFlightForTicket(value.split(' ')[0] || '')}
                                options={allFlightsDetails}
                                renderInput={(params) => (
                                    <TextField {...params} label="Flight" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setTypeForTicket(value || '')}
                                options={types}
                                renderInput={(params) => (
                                    <TextField {...params} label="Type" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                id="add-price"
                                label="Price"
                                variant="outlined"
                                value={addedPrice}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>

                        
                        <Grid item container justifyContent="flex-end" gap='10px'>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={handleCancelAddClick}
                                    style={{ background: 'lightgray', color: 'black' }}>
                                    Cancel
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    disabled={flightForTicket === '' || typeForTicket === '' || addedPrice === ''}
                                    variant="contained"
                                    onClick={handleSaveAddClick}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleAddClick}>
                            Add Ticket
                        </Button>
                    </Grid>
                )}

                {(isUpdateTicketActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Update Ticket
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setTicketForUpdate(value.split(' ')[0] || '')}
                                options={allTicketsDetails || []}
                                renderInput={(params) => (
                                    <TextField {...params} label="Choose Ticket" variant="outlined" />
                                )}
                            />
                        </Grid>


                        <Grid item>
                            <TextField
                                id="update-price"
                                label="Modify Price"
                                variant="outlined"
                                value={updatedPrice}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item container justifyContent="flex-end" gap='10px'>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={handleCancelUpdateClick}
                                    style={{ background: 'lightgray', color: 'black' }}>
                                    Cancel
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    disabled={updatedPrice === '' || ticketForUpdate === ''}
                                    variant="contained"
                                    onClick={handleSaveUpdateClick}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleUpdateClick}>
                            Update Ticket
                        </Button>
                    </Grid>
                )}

                {(isDeleteTicketActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Delete Ticket
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setTicketForDelete(value.split(' ')[0] || '')}
                                options={allTicketsDetails}
                                renderInput={(params) => (
                                    <TextField {...params} label="Deleted Ticket" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item container justifyContent="flex-end" gap='10px'>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={handleCancelDeleteClick}
                                    style={{ background: 'lightgray', color: 'black' }}>
                                    Cancel
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    disabled={ticketForDelete === ''}
                                    variant="contained"
                                    onClick={handleSaveDeleteClick}
                                    color="error">
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleDeleteClick}>
                            Delete Ticket
                        </Button>
                    </Grid>
                )}
            </Grid>

        </LocalizationProvider>

    )
};