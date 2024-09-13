import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    MenuItem,
    Box,
    IconButton,
    ImageList,
    ImageListItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import DashboardCard from 'src/components/shared/DashboardCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddVendor = () => {
    const { vendorId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        phone: '',
        email: '',
        state: '',
        address_line1: '',
        city: '',
        postal_code: '',
        desc: '',
      
      
        
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
  // assuming route is like /add-product or /edit-product/:vendorId

    useEffect(() => {
        console.log("vendorId: ", vendorId);
        if (vendorId) {
            setIsEditMode(true);
            fetchVendorDetails(vendorId);
        }
    }, [vendorId]);

    const fetchVendorDetails = async (id) => {
        try {
            const response = await axios.get(`http://134.209.145.149:9999/api/vendor/${id}`);
            console.log(response.data); // Check the response structure here
            if (response.data) {
                const vendor = response.data;
                setFormData({
                    name: vendor.name || '',
                    gender: vendor.gender || '',
                    phone: vendor.phone || '',
                    email: vendor.email || '',
                    state: vendor.state || '',
                    city: vendor.city || '',
                    address_line1: vendor.address_line1 || '',
                    postal_code: vendor.postal_code || '',
                    desc: vendor.desc || '',
                });
            }
        } catch (error) {
            toast.error('Failed to fetch vendor details.');
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = isEditMode
            ? `http://134.209.145.149:9999/api/vendor/${vendorId}`
            : 'http://134.209.145.149:9999/api/vendor';

        try {
            if (isEditMode) {
                await axios.put(apiUrl, formData);
                toast.success('vendor updated successfully!');
            } else {
                await axios.post(apiUrl, formData);
                toast.success('Vendor added successfully!');
            }
            setFormData({
                name: '',
                gender: '',
                phone: '',
                email: '',
                state: '',
                address_line1: '',
                city: '',
                postal_code: '',
                desc: '',
            });
            navigate(-1); // Navigate back to the previous page after successful submission
        } catch (error) {
            toast.error('Failed to save product. Please try again.');
        }
    };

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    {isEditMode ? 'Edit Vendor' : 'Add Vendor'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleGoBack}
                    >
                        Go back
                    </Button>
                </Box>
            </Box>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Mobile Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Address"
                                    name="address_line1"
                                    value={formData.address_line1}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Postal Code"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Descrption"
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    required
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    {isEditMode ? 'Update Vendor' : 'Add Vendor'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </DashboardCard>
    );
};

export default AddVendor;



