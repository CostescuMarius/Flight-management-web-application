import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, Link, Snackbar, Alert } from '@mui/material';
import HistorySection from './HistorySection.jsx';

/**
 * Component responsible for rendering the authentication card containing login and registration forms.
 * 
 * @returns {JSX.Element} The JSX representation of the AuthCard component.
 */
function HistoryCard() {
    const [showSnackbar, setShowSnackbar] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false);
 

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };
    
    const showMessage = (type, content) => {
        setIsSuccessSnackbar(type);

        setSnackbarMessage(content);

        setShowSnackbar(true);
    }

    return (
        // Main container for the authentication card
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={9} lg={9} xl={9} style={{ marginTop: 50 }}>
                {/* Card for containing login/registration content */}
                <Card>
                    {/* Render either the login or registration form based on the state */}
                    <CardContent>
                        <Grid container>
                            <HistorySection showMessage={showMessage}/>
                        </Grid> 
                    </CardContent>
                </Card>
            </Grid>

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

export default HistoryCard;