import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardContent, Typography } from '@mui/material';

function AdminSlider() {
    const settings = {
        dots: true, // Display dots for navigation
        infinite: true, // Infinite loop sliding
        speed: 500, // Transition speed in milliseconds
        slidesToShow: 2, // Show 2 slides at a time
        slidesToScroll: 2, // Scroll 2 slides at a time
        autoplay: true, // Automatically play slides
        autoplaySpeed: 3000, // Auto play speed in milliseconds
        centerMode: true, // Center the active slide
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: false, // Adjust center mode for smaller screens
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <Box sx={{ maxWidth: 920, mx: 'auto', mt: 4 }}> {/* Center the slider and card content */}
            <Box className="slider-container" sx={{ mb: 4 }}> {/* Add bottom margin for spacing */}
                <Slider {...settings}>
                    <Box sx={{ px: 2 }}> {/* Add horizontal padding to create gap */}
                        <img src="https://via.placeholder.com/340x300" alt="Image 1" />
                    </Box>
                    <Box sx={{ px: 2 }}> {/* Add horizontal padding to create gap */}
                        <img src="https://via.placeholder.com/340x300" alt="Image 2" />
                    </Box>
                    <Box sx={{ px: 2 }}> {/* Add horizontal padding to create gap */}
                        <img src="https://via.placeholder.com/340x300" alt="Image 3" />
                    </Box>
                    <Box sx={{ px: 2 }}> {/* Add horizontal padding to create gap */}
                        <img src="https://via.placeholder.com/340x300" alt="Image 4" />
                    </Box>
                    {/* Add more images as needed */}
                </Slider>
            </Box>

            {/* <Card> */}
                <CardContent>
                    <Typography variant="body1" color="textSecondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
                        tortor id pulvinar suscipit, ante lacus fermentum nisl, in lobortis nisi elit eget
                        felis.
                    </Typography>
                </CardContent>
            {/* </Card> */}
        </Box>
    );
}

export default AdminSlider;
