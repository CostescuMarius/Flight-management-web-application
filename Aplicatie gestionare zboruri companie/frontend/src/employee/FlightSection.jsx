import React from "react";

import { useState, useContext } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CompanyContext from "../context/CompanyContext.jsx";

export default function FlightSection({ showMessage, refreshFlights }) {
    const [isAddFlightActive, setIsAddFlightActive] = useState(false);
    const [isDeleteFlightActive, setIsDeleteFlightActive] = useState(false);
    const [isUpdateFlightActive, setIsUpdateFlightActive] = useState(false);

    const [planeForFlight, setPlaneForFlight] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    

    const [isAddLoading, setIsAddLoading] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const companyContext = useContext(CompanyContext);
    const allPlanesName = companyContext.allPlanesName;
    const allAirportsName = companyContext.allAirportsName;
    const allFlightsDetails = companyContext.allFlightsDetails;

    const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
    const [selectedArrivalDate, setSelectedArrivalDate] = useState('');

    
    const [modifyFlightPlane, setModifiyFlightPlane] = useState('');
    const [updatedFlightId, setUpdatedFlightId] = useState('');
    const [selectedModifyDepartureDate, setSelectedModifyDepartureDate] = useState('');
    const [selectedModifyArrivalDate, setSelectedModifyArrivalDate] = useState('');

    const [deletedFlightId, setDeletedFlightId] = useState('');


    const handleAddClick = () => {
        setIsAddFlightActive(true);
    }

    const handleDeleteClick = () => {
        setIsDeleteFlightActive(true);
    }

    const handleUpdateClick = () => {
        setIsUpdateFlightActive(true);
    }

    const handleCancelAddClick = () => {
        setIsAddFlightActive(false);
    }

    const handleCancelDeleteClick = () => {
        setIsDeleteFlightActive(false);
    }

    const handleCancelUpdateClick = () => {
        setIsUpdateFlightActive(false);
    }

    const sendAddFlightRequest = () => {
        setIsAddLoading(true);

        const departureTimestamp = selectedDepartureDate.toISOString();
        const arrivalTimestamp = selectedArrivalDate.toISOString();

        const flightInfo = {
            planeName: planeForFlight.trim(),
            departureAirportName: departureAirport.trim(),
            arrivalAirportName: arrivalAirport.trim(),
            departureDate: departureTimestamp,
            arrivalDate: arrivalTimestamp,
        };

        return fetch('api/flights/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flightInfo),
        }).then((response) => {
            if (response.ok) {
                setIsAddLoading(false);
                setIsAddFlightActive(false);

                setPlaneForFlight('');
                setSelectedDepartureDate('');
                setSelectedArrivalDate('');
                setDepartureAirport('');
                setArrivalAirport('');

                showMessage(true, 'The flight has been added successfully');
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
        await sendAddFlightRequest()
        refreshFlights();
    }

    const sendUpdateFlightRequest = () => {
        setIsUpdateLoading(true);

        const departureTimestamp = selectedModifyDepartureDate.toISOString();
        const arrivalTimestamp = selectedModifyArrivalDate.toISOString();

        const newFlightInfo = {
            id: updatedFlightId.trim(),
            planeName: modifyFlightPlane.trim(),
            departureDate: departureTimestamp,
            arrivalDate: arrivalTimestamp,
        };

        return fetch('api/flights/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFlightInfo),
        }).then((response) => {
            if (response.ok) {
                setIsUpdateLoading(false);
                setIsUpdateFlightActive(false);

                setUpdatedFlightId('');
                setSelectedModifyDepartureDate('');
                setSelectedModifyArrivalDate('');
                setModifiyFlightPlane('');

                showMessage(true, 'The flight has been updated successfully');
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
        await sendUpdateFlightRequest()
        refreshFlights();
    }

    const sendDeleteFlightRequest = () => {
        setIsDeleteLoading(true);

        const deletedFlightInfo = {
            id: deletedFlightId.trim(),
        };

        return fetch('api/flights/delete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedFlightInfo),
        }).then((response) => {
            if (response.status === 200 || response.status === 204) {
                setIsDeleteLoading(false);
                setIsDeleteFlightActive(false);

                setDeletedFlightId('');

                showMessage(true, 'The flight has been deleted successfully');
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
        await sendDeleteFlightRequest()
        refreshFlights();
    }

    const handleDepartureDateChange = (newDate) => {
        setSelectedDepartureDate(newDate);
    };

    const handleArrivalDateChange = (newDate) => {
        setSelectedArrivalDate(newDate);
    };

    const handleModifyDepartureDateChange = (newDate) => {
        setSelectedModifyDepartureDate(newDate);
    };

    const handleModifyArrivalDateChange = (newDate) => {
        setSelectedModifyArrivalDate(newDate);
    };

 

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item container direction='column' gap='20px'>
                {(isAddFlightActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Add Flight
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setPlaneForFlight(value || '')}
                                options={allPlanesName || []}
                                renderInput={(params) => (
                                    <TextField {...params} label="Plane" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setDepartureAirport(value || '')}
                                options={allAirportsName || []}
                                renderInput={(params) => (
                                    <TextField {...params} label="Departure Airport" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item container alignItems='center' gap='13px'>
                            <Grid item>
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
                                    Departure Data:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    value={selectedDepartureDate}
                                    onChange={handleDepartureDateChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setArrivalAirport(value || '')}
                                options={allAirportsName || []}
                                renderInput={(params) => (
                                    <TextField {...params} label="Arrival Airport" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item container alignItems='center' gap='47px'>
                            <Grid item>
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
                                    Arrival Data:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    value={selectedArrivalDate}
                                    onChange={handleArrivalDateChange}
                                />
                            </Grid>
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
                                    disabled={planeForFlight === '' || departureAirport === '' || arrivalAirport === '' ||
                                        selectedDepartureDate === '' || selectedArrivalDate === ''}
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
                            Add Flight
                        </Button>
                    </Grid>
                )}

                {isAddLoading &&
                    <Grid item xs>
                        <LinearProgress />
                    </Grid>
                }

                {(isUpdateFlightActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Update Flight
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setUpdatedFlightId(value.split(' ')[0] || '')}
                                options={allFlightsDetails || []}
                                renderInput={(params) => (
                                    <TextField {...params} label="Updated Flight" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setModifiyFlightPlane(value || '')}
                                options={allPlanesName}
                                renderInput={(params) => (
                                    <TextField {...params} label="Modify Plane" variant="outlined" />
                                )}
                            />
                        </Grid>

                        {/* <Grid item>
                            <TextField
                                label="Departure Airport"
                                variant="outlined"
                                value={"-"}
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </Grid> */}

                        <Grid item container alignItems='center' gap='13px'>
                            <Grid item>
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
                                    Modify Departure Data:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    value={selectedModifyDepartureDate}
                                    onChange={handleModifyDepartureDateChange}
                                />
                            </Grid>
                        </Grid>

                        {/* <Grid item>
                            <TextField
                                label="Arrival Airport"
                                variant="outlined"
                                value={"-"}
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </Grid> */}

                        <Grid item container alignItems='center' gap='47px'>
                            <Grid item>
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
                                    Modify Arrival Data:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    value={selectedModifyArrivalDate}
                                    onChange={handleModifyArrivalDateChange}
                                />
                            </Grid>
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
                                    disabled={updatedFlightId === '' || modifyFlightPlane === '' || 
                                    selectedModifyDepartureDate === '' || selectedModifyArrivalDate === ''}
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
                            Update Flight
                        </Button>
                    </Grid>
                )}

                {isUpdateFlightActive &&
                    <Grid item xs>
                        <LinearProgress />
                    </Grid>
                }

                {(isDeleteFlightActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Delete Flight
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                fullWidth
                                onChange={(event, value) => setDeletedFlightId(value.split(' ')[0] || '')}
                                options={allFlightsDetails || []}
                                renderInput={(params) => (
                                    <TextField {...params} label="Deleted Flight" variant="outlined" />
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
                                    disabled={deletedFlightId === ''}
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
                            Delete Flight
                        </Button>
                    </Grid>
                )}

                {isDeleteFlightActive &&
                    <Grid item xs>
                        <LinearProgress />
                    </Grid>
                }
            </Grid>

        </LocalizationProvider>

    )
};