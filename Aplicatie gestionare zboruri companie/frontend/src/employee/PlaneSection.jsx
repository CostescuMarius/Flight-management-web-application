import React from "react";

import { useState, useContext } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";

import CompanyContext from "../context/CompanyContext.jsx";

export default function PlaneSection({ showMessage, refreshPlanes, refreshFlights }) {
    const [isAddPlaneActive, setIsAddPlaneActive] = useState(false);
    const [isDeletePlaneActive, setIsDeletePlaneActive] = useState(false);

    const [addedPlaneName, setAddedPlaneName] = useState('');
    const [addedPlaneCapacity, setAddedPlaneCapacity] = useState('');

    const [isAddLoading, setIsAddLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const companyContext = useContext(CompanyContext);
    const allPlanesName = companyContext.allPlanesName;
    
    const [deletedPlaneName, setDeletedPlaneName] = useState('');

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === "name") {
            setAddedPlaneName(value);
        } else if (id === "capacity") {
            setAddedPlaneCapacity(value);
        }
    }

    const handleAddClick = () => {
        setIsAddPlaneActive(true);
    }

    const handleDeleteClick = () => {
        setIsDeletePlaneActive(true);
    }

    const handleCancelAddClick = () => {
        if(addedPlaneName !== '') {
            setAddedPlaneName('');
        }
        if(addedPlaneCapacity !== '') {
            setAddedPlaneCapacity('');
        }
        setIsAddPlaneActive(false);
    }

    const handleCancelDeleteClick = () => {
        setIsDeletePlaneActive(false);
    }

    const sendAddPlaneRequest = () => {
        setIsAddLoading(true);

        const planeInfo = {
            name: addedPlaneName.trim(),
            capacity: addedPlaneCapacity.trim(),
        };

        return fetch('api/planes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(planeInfo),
        }).then((response) => {
            if (response.ok) {
                setIsAddLoading(false);
                setIsAddPlaneActive(false);
                setAddedPlaneName('');
                setAddedPlaneCapacity('');

                showMessage(true, 'The plane has been added successfully');
            }
            return response.json();
        }).then((data) => {
            if(data.error) {
                throw new Error('Capacity must be a number');
            } else if (data.errors) {
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
        await sendAddPlaneRequest()
        refreshPlanes();
    }

    const sendDeletePlaneRequest = () => {
        setIsDeleteLoading(true);

        const deletedPlaneInfo = {
            name: deletedPlaneName.trim(),
        };

        return fetch('api/planes/delete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedPlaneInfo),
        }).then((response) => {
            if (response.status === 200 || response.status === 204) {
                setIsDeleteLoading(false);
                setIsDeletePlaneActive(false);
                setDeletedPlaneName('');

                showMessage(true, 'The plane has been deleted successfully');
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
        await sendDeletePlaneRequest();
        refreshPlanes();
        refreshFlights();
    }

    return (
        <Grid item container direction='column' gap='20px'>
            {(isAddPlaneActive) ? (
                <Grid item container direction="column" gap='12px'>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Add Plane
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={addedPlaneName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="capacity"
                            label="Capacity"
                            variant="outlined"
                            value={addedPlaneCapacity}
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
                                disabled={addedPlaneName === '' || addedPlaneCapacity === ''}
                                variant="contained"
                                onClick={handleSaveAddClick}>
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
                        Add Plane
                    </Button>
                </Grid>
            )}

            {isAddLoading &&
                <Grid item xs>
                    <LinearProgress />
                </Grid>
            }

            {(isDeletePlaneActive) ? (
                <Grid item container direction="column" gap='12px'>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Delete Plane
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Autocomplete
                            id='deleted-name'
                            fullWidth
                            onChange={(event, value) => setDeletedPlaneName(value || '')}
                            options={allPlanesName || []}
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
                                disabled={deletedPlaneName === ''}
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
                        Delete Plane
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