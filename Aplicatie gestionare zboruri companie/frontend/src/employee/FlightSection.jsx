import React from "react";

import { useState } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



export default function FlightSection({ showMessage }) {
    const [isAddFlightActive, setIsAddFlightActive] = useState(false);
    const [isDeleteFlightActive, setIsDeleteFlightActive] = useState(false);
    const [isUpdateFlightActive, setIsUpdateFlightActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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

    const options = [
        { label: '-' },
    ];

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
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
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
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
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
                            onClick={handleAddClick}>
                            Add Flight
                        </Button>
                    </Grid>
                )}

                {(isUpdateFlightActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Update Flight
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Updated Flight" variant="outlined" />
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
                                    <TextField {...params} label="Modify Plane" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Departure Airport"
                                variant="outlined"
                                value={"-"}
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item container alignItems='center' gap='13px'>
                            <Grid item>
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
                                    Modify Departure Data:
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
                            <TextField
                                label="Arrival Airport"
                                variant="outlined"
                                value={"-"}
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item container alignItems='center' gap='47px'>
                            <Grid item>
                                <Typography sx = {{color: 'gray'}} variant="subtitle1">
                                    Modify Arrival Data:
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
                                    onClick={handleCancelUpdateClick}
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

                {(isDeleteFlightActive) ? (
                    <Grid item container direction="column" gap='12px'>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Delete Flight
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
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
                            onClick={handleDeleteClick}>
                            Delete Flight
                        </Button>
                    </Grid>
                )}
            </Grid>

        </LocalizationProvider>

    )
};