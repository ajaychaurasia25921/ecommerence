import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { motion } from 'framer-motion';

// Motion variants for animation
const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' },
};

const buttonVariants = {
    rest: { opacity: 1 },
    hover: { opacity: 0.8 },
};

const ProductCard = () => {
    const product = {
        name: 'Stylish Product',
        description: 'This is a brief description of the stylish product. It features elegant design and excellent quality!',
        price: '$129.99',
        image: 'https://via.placeholder.com/500x300', // Replace with actual image URL
    };

    return (
        <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center' }}>
            <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardVariants}
                style={{ maxWidth: 500, position: 'relative' }}
            >
                <Card>
                    <CardMedia
                        component="img"
                        height="300"
                        image={product.image}
                        alt={product.name}
                    />
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {product.description}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
                            {product.price}
                        </Typography>
                    </CardContent>
                </Card>
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    style={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        color="primary"
                    >
                        Add to Cart
                    </Button>
                </motion.div>
            </motion.div>
        </Box>
    );
};

const ProductPage = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Featured Product
            </Typography>
            <ProductCard />
        </Box>
    );
};

export default ProductPage;
