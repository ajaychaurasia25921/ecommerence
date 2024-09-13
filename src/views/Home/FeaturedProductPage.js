import React from "react";
import { Grid, Card, CardContent, Container, CardMedia, Typography, Button, Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: "Product 1",
        description: "This is a great product.",
        imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
        price: "$10.00",
    },
    {
        id: 2,
        name: "Product 2",
        description: "This is a great product.",
        imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
        price: "$20.00",
    },
    {
        id: 3,
        name: "Product 3",
        description: "This is a great product.",
        imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
        price: "$30.00",
    },
    {
        id: 4,
        name: "Product 4",
        description: "This is a great product.",
        imageUrl: "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_1280.jpg",
        price: "$40.00",
    },
];

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[8],
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: 20,
    padding: '10px 20px',
    marginTop: '12px',
    textTransform: 'none',
    '&:hover': {
        background: theme.palette.primary.dark,
    },
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    textTransform: 'uppercase',
}));
const FeaturedProductPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleViewClick = (id) => {
        navigate(`/ItemDetails`); // Navigate to /agentdetails with the agent ID
    };
    return (
        <Container sx={{ mt: 4 }}>
        <Box sx={{ padding: 4 }}>
            <StyledTypography variant="h1">Featured Products</StyledTypography>
            {/* <Typography variant="h1" align="center" gutterBottom>
                Featured Products
            </Typography> */}
                <Grid container spacing={4} justifyContent="center" sx={{ padding: 1 }} onClick={() => handleViewClick()}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={3}>
                        <StyledCard sx={{ maxWidth: 345, borderRadius: 12 }}>
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="200"
                                image={product.imageUrl}
                                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                            />
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <IconButton color="primary">
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
                                    {product.price}
                                </Typography>
                                <StyledButton
                                    variant="contained"
                                    startIcon={<ShoppingCartIcon />}
                                    fullWidth
                                >
                                   Buy Now
                                </StyledButton>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
        </Container>
    );
};

export default FeaturedProductPage;
