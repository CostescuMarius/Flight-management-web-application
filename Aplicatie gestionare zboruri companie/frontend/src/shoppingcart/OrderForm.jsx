import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import UserContext from "../context/UserContext.jsx";


function OrderForm({ showMessage, switchSection }) {

    const userContext = useContext(UserContext);
    const currentUserData = userContext.currentUserData;

    const [name, setName] = useState(currentUserData.name);
    const [nameError, setNameError] = useState('');

    const [email, setEmail] = useState(currentUserData.email);
    const [emailError, setEmailError] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');

    const [cardName, setCardName] = useState('');
    const [cardNameError, setCardNameError] = useState('');

    const [cardValidity, setCardValidity] = useState('');
    const [cardValidityError, setCardValidityError] = useState('');

    const [CVV, setCVV] = useState('');
    const [CVVError, setCVVError] = useState('');



    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === "email") {
            setEmail(value);

            if (emailError !== '') {
                setEmailError('');
            }
        }
        else if (id === "name") {
            setName(value);

            if (nameError !== '') {
                setNameError('');
            }
        }
        else if (id === "cardNumber") {
            setCardNumber(value);

            if (cardNumberError !== '') {
                setCardNumberError('');
            }
        }
        else if (id === "cardName") {
            setCardName(value);

            if (cardNameError !== '') {
                setCardNameError('');
            }
        }

        else if (id === "cardValidity") {
            setCardValidity(value);

            if (cardValidityError !== '') {
                setCardValidityError('');
            }
        }

        else if (id === "cvv") {
            setCVV(value);

            if (CVVError !== '') {
                setCVVError('');
            }
        }
    }

    const validateInputs = () => {
        let isNameValid = name.trim() !== '';
        let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let isCardNumberValid = /^\d{16}$/.test(cardNumber);
        let isCardNameValid = cardName.trim() !== '';
        let isCVVValid = /^\d{3}$/.test(CVV);
        let isExpiryValid = /^\d{4}$/.test(cardValidity);

        setNameError(isNameValid ? '' : 'Please enter your name.');
        setEmailError(isEmailValid ? '' : 'Please enter a valid email.');
        setCardNumberError(isCardNumberValid ? '' : 'Please enter a valid 16-digit card number.');
        setCardNameError(isCardNameValid ? '' : 'Please enter card name.');
        setCVVError(isCVVValid ? '' : 'Please enter a valid 3-digit CVV.');
        setCardValidityError(isExpiryValid ? '' : 'Please enter a valid 4-digit expiry date.');

        return isNameValid && isEmailValid && isCardNumberValid && isCardNameValid && isCVVValid && isExpiryValid;
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();


        if (validateInputs()) {
            buyShoppingCart();
            window.location.assign("http://localhost:8080");
        }
    };

    const buyShoppingCart = () => {
        const checkInfo = {
          userEmail: currentUserData.email
        };
    
    
        fetch('api/shoppingcart/buyall', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkInfo),
        }).then((response) => {
          return response.json();
        }).then((data) => {
          if (data.errorMessage) {
            throw new Error(data.errorMessage);
          }
    
        }).catch(error => {
          setIsCheckLoading(false);
    
          showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        })
      }

      
    return (
        <form onSubmit={handleSubmitForm}>

            <Grid container gap="20px" direction="column">
                <Grid item>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => switchSection("shoppingCart")}
                    >
                        Back
                    </Button>
                </Grid>

                <Grid item>
                    <Typography variant='h6'>
                        Billing Details
                    </Typography>
                </Grid>

                <Grid item>
                    <TextField
                        id="name"
                        name="name"
                        label="Name for ticket"
                        variant="outlined"
                        value={name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        fullWidth
                    />
                </Grid>


                <Grid item>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleInputChange}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        fullWidth
                    />
                </Grid>

                <Grid item>
                    <Typography variant='h6'>
                        Card Details
                    </Typography>
                </Grid>

                <Grid item container gap='10px' justifyContent={"space-between"} alignItems={"center"}>
                    <Grid item container direction='column' gap='10px' style={{ width: '65%' }}>
                        <Grid item>
                            <TextField
                                id="cardNumber"
                                label="Card Number"
                                variant="outlined"
                                type="number"
                                value={cardNumber}
                                onChange={handleInputChange}
                                error={Boolean(cardNumberError)}
                                helperText={cardNumberError}
                                fullWidth
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                id="cardName"
                                label="Name On Card"
                                variant="outlined"
                                value={cardName}
                                onChange={handleInputChange}
                                error={Boolean(cardNameError)}
                                helperText={cardNameError}
                                fullWidth
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                id="cardValidity"
                                label="Card Expiry"
                                variant="outlined"
                                type="number"
                                value={cardValidity}
                                onChange={handleInputChange}
                                error={Boolean(cardValidityError)}
                                helperText={cardValidityError}
                                fullWidth
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                id="cvv"
                                label="CVV"
                                variant="outlined"
                                type="number"
                                value={CVV}
                                onChange={handleInputChange}
                                error={Boolean(CVVError)}
                                helperText={CVVError}
                                fullWidth
                            />
                        </Grid>
                    </Grid>


                    <Grid item>
                        <Cards
                            number={cardNumber}
                            expiry={cardValidity}
                            cvc={CVV}
                            name={cardName}
                        />
                    </Grid>
                </Grid>



                <Grid item container justifyContent="center">
                    <Button type="submit" variant="contained" color="primary">
                        Finish Order
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default OrderForm;
