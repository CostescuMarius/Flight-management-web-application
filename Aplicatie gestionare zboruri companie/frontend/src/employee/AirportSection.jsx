import React from "react";

import { useState, useContext } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";

import CompanyContext from "../context/CompanyContext.jsx";


export default function AirportSection({ showMessage, refreshAirports, refreshFlights, refreshTickets }) {
    const [isAddAirportActive, setIsAddAirportActive] = useState(false);
    const [isDeleteAirportActive, setIsDeleteAirportActive] = useState(false);

    const [addedAirportName, setAddedAirportName] = useState('');
    const [addedAirportLocation, setAddedAirportLocation] = useState('');

    const [deletedAirportName, setDeletedAirportName] = useState('');

    const [isAddLoading, setIsAddLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const companyContext = useContext(CompanyContext);
    const allAirportsName = companyContext.allAirportsName;

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === "add-name") {
            setAddedAirportName(value);
        } else if (id === "location") {
            setAddedAirportLocation(value);
        }
    }

    const handleAddClick = () => {
        setIsAddAirportActive(true);
    }

    const handleDeleteClick = () => {
        setIsDeleteAirportActive(true);
    }

    const handleCancelAddClick = () => {
        setIsAddAirportActive(false);
    }

    const handleCancelDeleteClick = () => {
        setIsDeleteAirportActive(false);
    }

    const sendAddAirportRequest = () => {
        setIsAddLoading(true);

        const airportInfo = {
            name: addedAirportName.trim(),
            location: addedAirportLocation.trim(),
        };

        return fetch('api/airports/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(airportInfo),
        }).then((response) => {
            if (response.ok) {
                setIsAddLoading(false);
                setIsAddAirportActive(false);
                setAddedAirportName('');
                setAddedAirportLocation('');

                showMessage(true, 'The airport has been added successfully');
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
        await sendAddAirportRequest()
        refreshAirports();
    }

    const sendDeleteAirportRequest = () => {
        setIsDeleteLoading(true);

        const deletedAirportInfo = {
            name: deletedAirportName.trim(),
        };

        return fetch('api/airports/delete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedAirportInfo),
        }).then((response) => {
            if (response.status === 200 || response.status === 204) {
                setIsDeleteLoading(false);
                setIsDeleteAirportActive(false);
                setDeletedAirportName('');

                showMessage(true, 'The airport has been deleted successfully');
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
        await sendDeleteAirportRequest();
        refreshAirports();
        refreshFlights();
        refreshTickets();
    }

    return (
        <Grid item container direction='column' gap='20px'>
            {(isAddAirportActive) ? (
                <Grid item container direction="column" gap='12px'>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Add Airport
                        </Typography>
                    </Grid>

                    <Grid item>
                        <TextField
                            id="add-name"
                            label="Name"
                            variant="outlined"
                            value={addedAirportName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="location"
                            label="Location"
                            variant="outlined"
                            value={addedAirportLocation}
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
                                disabled={addedAirportName === '' || addedAirportLocation === ''}
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
                        Add Airport
                    </Button>
                </Grid>
            )}

            {isAddLoading &&
                <Grid item xs>
                    <LinearProgress />
                </Grid>
            }

            {(isDeleteAirportActive) ? (
                <Grid item container direction="column" gap='12px'>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Delete Airport
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Autocomplete
                            fullWidth
                            onChange={(event, value) => setDeletedAirportName(value || '')}
                            options={allAirportsName || []}
                            renderInput={(params) => (
                                <TextField {...params} label="Deleted Plane" variant="outlined" />
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
                                disabled={deletedAirportName === ''}
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
                        Delete Airport
                    </Button>
                </Grid>
            )}

            {isDeleteLoading &&
                <Grid item xs>
                    <LinearProgress />
                </Grid>
            }
        </Grid>


    )
};