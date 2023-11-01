import React from "react";

import { useState } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";


export default function PlaneSection({ showMessage }) {
    const [isAddPlaneActive, setIsAddPlaneActive] = useState(false);
    const [isDeletePlaneActive, setIsDeletePlaneActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleAddClick = () => {
        setIsAddPlaneActive(true);
    }

    const handleDeleteClick = () => {
        setIsDeletePlaneActive(true);
    }

    const handleCancelAddClick = () => {
        setIsAddPlaneActive(false);
    }

    const handleCancelDeleteClick = () => {
        setIsDeletePlaneActive(false);
    }

    const options = [
        { label: 'Option X' },
    ];

    return (
        <Grid item container direction='column' gap='10px'>
            <Grid item style={{ padding: '10px' }}>
                <Typography variant="h6">
                    Plane
                </Typography>
            </Grid>

            {(isAddPlaneActive) ? (
                <Grid container direction="column" gap='7px'>
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
                            label="Capacity"
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
                        onClick={handleAddClick}
                        style={{marginLeft:'20px'}}>
                        Add Plane
                    </Button>
                </Grid>
            )}

            {(isDeletePlaneActive) ? (
                <Grid container direction="column" gap='7px'>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            fullWidth
                            options={options}
                            getOptionLabel={(option) => option.label}
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
                        Delete Plane
                    </Button>
                </Grid>
            )}
        </Grid>


    )
};