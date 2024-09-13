import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Layout from '../Home/Layout';

const BuyNow = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        state: '',
        city: '',
        postalCode: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleValidation = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.firstName) {
            tempErrors["firstName"] = "First Name is required";
            isValid = false;
        }
        if (!formData.lastName) {
            tempErrors["lastName"] = "Last Name is required";
            isValid = false;
        }
        if (!formData.email) {
            tempErrors["email"] = "Email is required";
            isValid = false;
        }
        if (!formData.address) {
            tempErrors["address"] = "Address is required";
            isValid = false;
        }
        if (!formData.state) {
            tempErrors["state"] = "State is required";
            isValid = false;
        }
        if (!formData.city) {
            tempErrors["city"] = "City is required";
            isValid = false;
        }
        if (!formData.postalCode) {
            tempErrors["postalCode"] = "Postal Code is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            // Redirect to PayPal URL
            window.location.href = 'https://www.paypal.com/checkout';
        }
    };

    return (
        <Layout>
            <Box
                sx={{
                    maxWidth: 'lg',
                    mx: 'auto',
                    mt: 4,
                    mb: 4,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    '@media (max-width:600px)': {
                        p: 2,
                    },
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
                                component="img"
                                image="https://via.placeholder.com/500" // Replace with your product image URL
                                alt="Product Image"
                                sx={{ height: 400, objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Product Name
                                </Typography>
                                <Typography variant="h6" component="div" color="primary" gutterBottom>
                                    $99.99
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Product details go here. This can include a description, features, or other relevant information.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    textAlign: 'center',
                                    mb: 3,
                                    fontWeight: 600,
                                    color: '#333',
                                }}
                            >
                                Checkout Form
                            </Typography>
                            <Box
                                sx={{
                                    flex: '1 0 auto',
                                    '& .MuiTextField-root': {
                                        mb: 2,
                                    },
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            error={!!errors.firstName}
                                            helperText={errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            error={!!errors.lastName}
                                            helperText={errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            error={!!errors.address}
                                            helperText={errors.address}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            error={!!errors.state}
                                            helperText={errors.state}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            error={!!errors.city}
                                            helperText={errors.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Postal Code"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            error={!!errors.postalCode}
                                            helperText={errors.postalCode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                            sx={{
                                                backgroundColor: "#0070ba",
                                                color: "white",
                                                borderRadius: "5px",
                                                minWidth: "150px",
                                                padding: "12px 30px",
                                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                                '&:hover': {
                                                    backgroundColor: '#005a9c',
                                                },
                                                '@media (max-width:600px)': {
                                                    minWidth: '120px',
                                                    padding: '10px 20px',
                                                },
                                            }}
                                        >
                                            Pay with PayPal
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default BuyNow;
