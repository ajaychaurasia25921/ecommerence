import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Box, Rating } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import Navbar from './Navbar';
import Footer from './Footer';
import AgentSlider from './AgentSlider';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginTop: '21px',
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    textTransform: 'uppercase',
}));

const StyledCard = styled(motion(Card))(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 1200,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[10],
    },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
    '& img': {
        width: '100%',
        height: 'auto',
        borderRadius: theme.shape.borderRadius,
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
}));

const StatusDot = styled(Box)(({ online }) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: online ? '#faaf00' : 'grey',
    display: 'inline-block',
    marginRight: 8,
}));

const StatusText = styled(Typography)(({ online }) => ({
    color: online ? 'green' : 'grey',
    fontSize: '0.875rem',
    display: 'inline',
}));

const AgentDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Sample online status
    const onlineStatus = true; // Change this value to false for offline

    return (
        <>
            <Navbar />
            <div className='container'>
                <StyledTypography variant="h1">Agent Detail</StyledTypography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: { xs: 2, md: 4 },
                        minHeight: '80vh',
                        backgroundColor: 'background.default',
                    }}
                >
                    <StyledCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Left Side: Agent Profile and Details */}
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: { xs: 3, md: 5 },
                                backgroundColor: 'background.paper',
                                borderRight: '1px solid #ddd',
                                gap: 2,
                            }}
                        >
                            <Avatar
                                src="https://via.placeholder.com/400" // Replace with the agent's image URL
                                alt="Agent"
                                sx={{
                                    width: { xs: 180, md: 280 },
                                    height: { xs: 180, md: 280 },
                                    borderRadius: '50%',
                                    boxShadow: 3,
                                    marginBottom: 2,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                            <CardContent>
                                <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  
                                    Agent Name
                                    <StatusText online={onlineStatus} sx={{ marginLeft: 1 }}>
                                        <StatusDot online={onlineStatus} />{onlineStatus ? 'Online' : 'Offline'}
                                    </StatusText>
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    Location: Toronto
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    Age: 25 years
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    Language: Hindi, English, french
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                                    {/* <Email color="primary" /> */}
                                    <Typography variant="body1" color="textSecondary">
                                        Reviews:-
                                    </Typography>
                                    <Rating name="agent-rating" value={4} readOnly />

                                </Box>
                                <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                                    <Phone color="primary" />
                                    <Typography variant="body1" color="textSecondary">
                                        (123) 456-7890
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Grid>

                        {/* Right Side: Static Photos and Description */}
                        {/* <Grid
                            // item
                            // xs={12}
                            // md={6}
                            // sx={{
                            //     // display: 'flex',
                              
                            //     padding: { xs: 3, md: 5 },
                            //     backgroundColor: 'background.default',
                            // }}
                        > */}
                            <AgentSlider/>
                            {/* <ImageContainer>
                                {/* Replace with actual image URLs */}
                               
                            {/* </ImageContainer> */} 
                            {/* <CardContent>
                                <Typography variant="body1" color="textSecondary" sx={{ mt: 3 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
                                    tortor id pulvinar suscipit, ante lacus fermentum nisl, in lobortis nisi elit eget
                                    felis.
                                </Typography>
                               
                            </CardContent>
                        // </Grid> */}
                        {/* </Grid>  */}
                    </StyledCard>
                </Box>
            </div>
            <Footer />
        </>
    );
};

export default AgentDetails;
