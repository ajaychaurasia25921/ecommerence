import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box } from '@mui/material';

const items = [
    {
        name: "Item 1",
        description: "Description for item 1",
        imageUrl: "https://cdn.pixabay.com/photo/2017/08/07/19/45/ecommerce-2607114_1280.jpg"
    },
    {
        name: "Item 2",
        description: "Description for item 2",
        imageUrl: "https://cdn.pixabay.com/photo/2018/07/11/11/14/ecommerce-3530785_1280.jpg"
    },
    {
        name: "Item 3",
        description: "Description for item 3",
        imageUrl: "https://cdn.pixabay.com/photo/2022/07/06/03/41/business-7304257_1280.jpg"
    }
];

const StyledCarousel = () => {
    return (
        <Carousel
            indicators={false}
            navButtonsAlwaysVisible
            autoPlay={true}
            interval={4000}
            animation="slide"
            swipe={true}
        >
            {items.map((item, index) => (
                <CarouselItem key={index} item={item} />
            ))}
        </Carousel>
    );
};

const CarouselItem = ({ item }) => {
    return (
        <Paper elevation={3} sx={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
            <Box
                component="img"
                src={item.imageUrl}
                alt={item.name}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    color: 'white',
                    background: 'rgba(0, 0, 0, 0.5)',
                    p: 2,
                }}
            >
                <Typography variant="h4" align="center">{item.name}</Typography>
                <Typography variant="body2" align="center">{item.description}</Typography>
            </Box>
        </Paper>
    );
};

export default StyledCarousel;
