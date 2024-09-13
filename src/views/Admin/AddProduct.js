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

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        category_id: '1',
        // SKU: '',
        // price: '',
        // // currency: 'USD',
        // inventory: '',
        // brand: '',
        // weight: '',
        // dimensions: {
        //     depth: '',
        //     width: '',
        //     height: '',
        // },
        // images: [], // Ensure this is initialized as an array
        // tags: [],
        // variations: [],
        // status: false,
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
            const response = await axios.get(`http://134.209.145.149:9999/api/product/${id}`);
            if (response.data && response.data) {
              
                const product = response.data;
                setFormData({
                    name: product.name || '',
                    desc: product.desc || '',
                    // category_id: product.category_id || '',
                    // SKU: product.SKU || '',
                    // price: product.price || '',
                    // currency: product.currency || 'USD',
                    // inventory: product.inventory || '',
                    // brand: product.brand || '',
                    // Other fields can be added here as needed
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setFormData({
            ...formData,
            images: [...formData.images, ...newImages],
        });
    };

    const handleRemoveImage = (url) => {
        setFormData({
            ...formData,
            images: formData.images.filter(image => image !== url),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = isEditMode
            ? `http://134.209.145.149:9999/api/product/${productId}`
            : 'http://134.209.145.149:9999/api/product';

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
                desc: '',
                // category: '',
                // SKU: '',
                // price: '',
                // currency: 'USD',
                // inventory: '',
                // brand: '',
                // weight: '',
                // dimensions: {
                //     depth: '',
                //     width: '',
                //     height: '',
                // },
                // images: [], // Reset to an empty array
                // tags: [],
                // variations: [],
                // status: false,
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
                    {isEditMode ? 'Edit Product' : 'Add Product'}
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
                                    label="Product Name"
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
                                    label="Description"
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    required
                                />
                            </Grid>
                            {/* <Grid item xs={12} md={6}>
                                <TextField
                                    label="Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    variant="outlined"
                                    select
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="Electronics">Electronics</MenuItem>
                                    <MenuItem value="Clothing">Clothing</MenuItem>
                                    <MenuItem value="Home">Home</MenuItem>
                                    <MenuItem value="Books">Books</MenuItem>
                                </TextField>
                            </Grid> */}
                            {/* <Grid item xs={12} md={6}>
                                <TextField
                                    label="SKU"
                                    name="SKU"
                                    value={formData.SKU}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Quantity"
                                    name="inventory"
                                    value={formData.inventory}
                                    onChange={handleChange}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    required
                                />
                            </Grid> */}
                            {/* <Grid item xs={12} md={6}>
                                <TextField
                                    label="Brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid> */}
                            {/* <Grid item xs={12} md={6}>
                                <TextField
                                    label="Weight (kg)"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Depth (cm)"
                                    name="depth"
                                    value={formData.dimensions.depth}
                                    onChange={handleDimensionChange}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Width (cm)"
                                    name="width"
                                    value={formData.dimensions.width}
                                    onChange={handleDimensionChange}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Height (cm)"
                                    name="height"
                                    value={formData.dimensions.height}
                                    onChange={handleDimensionChange}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="file"
                                    fullWidth
                                    inputProps={{ multiple: true, accept: "image/*" }}
                                    onChange={handleImageChange}
                                    variant="outlined"
                                    label="Upload Images"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid> */}
                            {/* <Grid item xs={12}>
                                <ImageList cols={3}>
                                    {Array.isArray(formData.images) && formData.images.map((url, index) => (
                                        <ImageListItem key={index}>
                                            <img src={url} alt={`product image ${index}`} />
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleRemoveImage(url)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    {isEditMode ? 'Update Product' : 'Add Product'}
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

export default AddProduct;



