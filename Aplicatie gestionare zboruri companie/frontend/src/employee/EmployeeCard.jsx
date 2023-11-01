import React, { useState } from 'react';
import {
    Grid, Card, CardHeader, CardContent, Snackbar, Alert,
} from '@mui/material';

import PlaneSection from './PlaneSection.jsx';
import FlightSection from './FlightSection.jsx';
import AirportSection from './AirportSection.jsx';


function EmployeeCard() {  
    const [showSnackbar, setShowSnackbar] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false);

    /*
     * Handle the Snackbar close event.
     */
    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    /**
     * Sets the snackbar type and message.
     */
    const showMessage = ( type , content ) => {
        setIsSuccessSnackbar(type);
 
        setSnackbarMessage(content);

        setShowSnackbar(true);
    }


    return (
        // Main container for the employee card
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={10} lg={8} xl={6} style={{ marginTop: 50 }}>
                <Card>
                    <CardHeader
                        title={"Flight Managament"}
                    />

                    <CardContent>
                        <Grid container direction='column' gap='30px'>
                            <PlaneSection
                                showMessage={showMessage}
                            />

                            <AirportSection
                                showMessage={showMessage}
                            />

                            <FlightSection
                                showMessage={showMessage}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Conditionally render the Snackbar for showing error messages if showSnackbar is true */}
            {showSnackbar &&
                <Grid item>
                    <Snackbar
                        open={showSnackbar}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                    >
                        <Alert
                            elevation={6}
                            variant="filled"
                            onClose={handleSnackbarClose}
                            severity={isSuccessSnackbar ? 'success' : 'error'}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Grid>}
        </Grid>
    );
}

export default EmployeeCard;