import React from "react";

import { useState } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



export default function FlightSection({ showMessage }) {
    const [isAddFlightActive, setIsAddFlightActive] = useState(false);
    const [isDeleteFlightActive, setIsDeleteFlightActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleAddClick = () => {
        setIsAddFlightActive(true);
    }

    const handleDeleteClick = () => {
        setIsDeleteFlightActive(true);
    }

    const handleCancelAddClick = () => {
        setIsAddFlightActive(false);
    }

    const handleCancelDeleteClick = () => {
        setIsDeleteFlightActive(false);
    }

    const options = [
        { label: '-' },
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item container direction='column' style={{ borderTop: "1px solid #333" }} gap='12px'>
                <Grid item style={{ padding: '10px' }}>
                    <Typography variant="h6">
                        Flight
                    </Typography>
                </Grid>

                {(isAddFlightActive) ? (
                    <Grid container direction="column" gap='12px'>
                        <Grid item>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Plane" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Departure Airport" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item container alignItems='center' gap='13px'>
                            <Grid item>
                                <Typography variant="h6">
                                    Departure Data:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    //defaultValue={today}
                                    //minDate={tomorrow}
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                />
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Arrival Airport" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item container alignItems='center' gap='47px'>
                            <Grid item>
                                <Typography variant="h6">
                                    Arrival Data:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    //defaultValue={today}
                                    //minDate={tomorrow}
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
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
                                    //disabled={currentPassword === '' || newPassword === '' || confirmNewPassword === ''}
                                    variant="contained"
                                //onClick={handleSaveAddClick}
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
                            onClick={handleAddClick}
                            style={{marginLeft:'20px'}}>
                            Add Flight
                        </Button>
                    </Grid>
                )}

                {(isDeleteFlightActive) ? (
                    <Grid container direction="column" gap='7px'>
                        <Grid item>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Your Label" variant="outlined" />
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
                                    //disabled={currentPassword === '' || newPassword === '' || confirmNewPassword === ''}
                                    variant="contained"
                                    //onClick={handleSaveDeleteClick}
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
                            onClick={handleDeleteClick}
                            style={{marginLeft:'20px'}}>
                            Delete Flight
                        </Button>
                    </Grid>
                )}
            </Grid>

        </LocalizationProvider>

    )
};