import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://134.209.145.149:9999/api/productById/${productId}`)
            .then(response => {
                const productData = response.data.data[0];
                // Split images string into an array
                productData.images = productData.images ? productData.images.split(',') : [];
                setProduct(productData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!product) {
        return <Typography variant="h5">Product not found</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <ImageList cols={1}>
                            {product.images.map((image, index) => (
                                <ImageListItem key={index}>
                                    <CardMedia
                                        component="img"
                                        image={image}
                                        alt={`${product.name} image ${index + 1}`}
                                        sx={{ height: 400, objectFit: 'contain' }}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                {product.description}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Price: {product.currency} {product.price}
                            </Typography>
                            <Typography variant="body1">
                                Category: {product.category}
                            </Typography>
                            <Typography variant="body1">
                                SKU: {product.sku}
                            </Typography>
                            <Typography variant="body1">
                                Brand: {product.brand}
                            </Typography>
                            {product.weight && (
                                <Typography variant="body1">
                                    Weight: {product.weight} kg
                                </Typography>
                            )}
                            {product.dimensions && (
                                <Typography variant="body1">
                                    Dimensions: {product.dimensions}
                                </Typography>
                            )}
                            <Typography variant="body1" color="secondary">
                                Status: {product.status ? "Available" : "Out of Stock"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
