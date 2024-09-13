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

const AddLanguage = () => {
    const [formData, setFormData] = useState({
        name: '',
      
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const { productId } = useParams(); // assuming route is like /add-product or /edit-product/:productId

    useEffect(() => {
        if (productId) {
            setIsEditMode(true);
            fetchProductDetails(productId);
        }
    }, [productId]);

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`http://134.209.145.149:9999/api/language/${id}`);
            if (response.data && response.data) {
              
                const product = response.data;
                setFormData({
                    name: product.name || '',

                });
            }
                // setFormData({
                //     ...product,
                //     dimensions: product.dimensions || { depth: '', width: '', height: '' },
                //     images: Array.isArray(product.images) ? product.images : [], // Ensure it's an array
                //     tags: Array.isArray(product.tags) ? product.tags : [],
                //     variations: Array.isArray(product.variations) ? product.variations : [],
                // });
            } catch (error) {
            toast.error('Failed to fetch product details.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            dimensions: {
                ...formData.dimensions,
                [name]: value,
            },
        });
    };

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = isEditMode
            ? `http://134.209.145.149:9999/api/language/${productId}`
            : 'http://134.209.145.149:9999/api/language';

        try {
            if (isEditMode) {
                await axios.put(apiUrl, formData);
                toast.success('Product updated successfully!');
            } else {
                await axios.post(apiUrl, formData);
                toast.success('Product added successfully!');
            }
            setFormData({
                name: '',
               
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
                    {isEditMode ? 'Edit Language' : 'Add Language'}
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
                                    label="Language Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                          
                     
                       
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    {isEditMode ? 'Update Language' : 'Add Language'}
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

export default AddLanguage;



