import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Avatar,
    Divider,
    Chip,
    CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // For API calls

const VendorDetails = () => {
    const { vendorId } = useParams(); // Getting vendorId from route params
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch vendor details from API (Replace this with your actual API endpoint)
    useEffect(() => {
        axios.get(`http://localhost:9999/api/vendor/${vendorId}`)
            .then((response) => {
                setVendor(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the vendor details!", error);
                setLoading(false);
            });
    }, [vendorId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!vendor) {
        return (
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
                Vendor details not found.
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <CardMedia
                    component="img"
                    image={vendor.imageUrl || '/images/default-vendor.jpg'} // Placeholder image if no URL
                    alt="Vendor Image"
                    sx={{ width: { xs: '100%', md: '300px' }, height: 'auto' }}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {vendor.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {vendor.post}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="500">Project Name:</Typography>
                            <Typography variant="body2">{vendor.pname}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="500">Priority:</Typography>
                            <Chip label={vendor.priority} color="primary" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" fontWeight="500">Budget:</Typography>
                            <Typography variant="body2">${vendor.budget}k</Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" fontWeight="500">Description:</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {vendor.description || "No description available."}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default VendorDetails;
