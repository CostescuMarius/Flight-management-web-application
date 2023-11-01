import React from "react";

import { useState } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";


export default function AirportSection({ showMessage }) {
    const [isAddAirportActive, setIsAddAirportActive] = useState(false);
    const [isDeleteAirportActive, setIsDeleteAirportActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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

    const options = [
        { label: 'Option X' },
    ];

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
                            label="Name"
                            variant="outlined"
                            //value={currentPassword}
                            //onChange={handleInputChange}
                            //error={Boolean(currentPasswordError)}
                            //helperText={currentPasswordError}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Location"
                            variant="outlined"
                            //value={currentPassword}
                            //onChange={handleInputChange}
                            //error={Boolean(currentPasswordError)}
                            //helperText={currentPasswordError}
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
                        Add Airport
                    </Button>
                </Grid>
            )}

            {(isDeleteAirportActive) ? (
                <Grid item container direction="column" gap='12px'>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Delete Airport
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            fullWidth
                            options={options}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField {...params} label="Deleted Airport" variant="outlined" />
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
                        Delete Plane
                    </Button>
                </Grid>
            )}
        </Grid>


    )
};