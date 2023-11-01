import React from "react";

import { useState } from "react";

import { Grid, TextField, Button, Typography, LinearProgress, Autocomplete } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



export default function TicketSection({ showMessage }) {
    const [isAddTicketActive, setIsAddTicketActive] = useState(false);
    const [isDeleteTicketActive, setIsDeleteTicketActive] = useState(false);
    const [isUpdateTicketActive, setIsUpdateTicketActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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

    const options = [
        { label: '-' },
    ];

    const types = [
        { label: 'Full' },
        { label: 'Student' },
        { label: 'Child' },
    ];

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
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Flight" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                options={types}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Type" variant="outlined" />
                                )}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Price"
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
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Choose Ticket" variant="outlined" />
                                )}
                            />
                        </Grid>


                        <Grid item>
                            <TextField
                                label="Modify Price"
                                variant="outlined"
                                value={"-"}
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
                                disablePortal
                                fullWidth
                                options={options}
                                getOptionLabel={(option) => option.label}
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
                            Delete Ticket
                        </Button>
                    </Grid>
                )}
            </Grid>

        </LocalizationProvider>

    )
};