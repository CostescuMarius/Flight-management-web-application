import React, { useState } from 'react';
import {
    Grid, Card, CardHeader, CardContent, Snackbar, Alert,
    Accordion, AccordionDetails, AccordionSummary, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PlaneSection from './PlaneSection.jsx';
import FlightSection from './FlightSection.jsx';
import AirportSection from './AirportSection.jsx';
import TicketSection from './TicketSection.jsx';


function EmployeeCard({ refreshPlanes, refreshAirports, refreshFlights, refreshTickets }) {
    const [showSnackbar, setShowSnackbar] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false);

    const [expanded, setExpanded] = useState(null);

    /*
     * Handle the Snackbar close event.
     */
    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    /**
     * Sets the snackbar type and message.
     */
    const showMessage = (type, content) => {
        setIsSuccessSnackbar(type);

        setSnackbarMessage(content);

        setShowSnackbar(true);
    }

    const refreshPlanesName = () => {
        refreshPlanes();
    }

    const refreshAirportsName = () => {
        refreshAirports();
    }

    const refreshFlightsDetails = () => {
        refreshFlights();
    }

    const refreshTicketsDetails = () => {
        refreshTickets();
    }
    

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (

        // Main container for the employee card
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={10} lg={8} xl={6} style={{ marginTop: 50 }}>
                <Card>
                    <CardHeader
                        title={"Flight Managament"}
                    />

                    <CardContent>
                        <Grid container direction="column" gap='10px'>
                            <Grid item>
                                <Accordion expanded={expanded === 'plane'} onChange={handleChange('plane')}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Plane Section</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {<PlaneSection
                                            showMessage={showMessage}
                                            refreshPlanes = {refreshPlanesName}
                                            refreshFlights = {refreshFlightsDetails}
                                            refreshTickets={refreshTicketsDetails}
                                        />}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item>
                                <Accordion expanded={expanded === 'airport'} onChange={handleChange('airport')}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Airport Section</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {<AirportSection 
                                            showMessage={showMessage} 
                                            refreshAirports = {refreshAirportsName}
                                            refreshFlights = {refreshFlightsDetails}
                                            refreshTickets={refreshTicketsDetails}
                                        />}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item>
                                <Accordion expanded={expanded === 'flight'} onChange={handleChange('flight')}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Flight Section</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {<FlightSection 
                                            showMessage={showMessage} 
                                            refreshFlights={refreshFlightsDetails}
                                            refreshTickets={refreshTicketsDetails}
                                        />}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item>
                                <Accordion expanded={expanded === 'ticket'} onChange={handleChange('ticket')}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Ticket Section</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {<TicketSection 
                                            showMessage={showMessage}
                                            refreshTickets={refreshTicketsDetails}
                                        />}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
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