import React from 'react';
import { Grid, Card,Box, CardContent, Typography, Button, Divider } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Layout from '../Home/Layout';
import { styled } from '@mui/system';


const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginTop: '21px',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  textTransform: 'uppercase',
}));
const PricingCard = ({ title, price, features, buttonText }) => {
  return (

    <Card
      variant="outlined"
      sx={{
        maxWidth: 300, // Increased width for larger cards
        borderRadius: 3, // Rounded corners
        boxShadow: 6, // Increased shadow depth for a more elevated effect
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth hover effects
        '&:hover': {
          transform: 'scale(1.05)', // Slight zoom on hover
          boxShadow: 12, // Stronger shadow on hover
        },
        padding: 2, // Added padding inside the card
        margin: 2, // Increased margin between cards
      }}
    >
      <CardContent>
        <Typography variant="h5" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {price}
        </Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mb: 3 }}>
          {buttonText}
        </Button>
        <Divider sx={{ mb: 2 }} />
        {features.map((feature, index) => (
          <Typography
            key={index}
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mt: 1.5, mb: 1.5 }}
          >
            <strong>{feature.label}</strong> {feature.text}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

const Subscription = () => {
  const pricingPlans = [
    {
      title: 'Basic',
      price: 'Free Trial',
      buttonText: 'Get Started',
      features: [
        { label: 'No', text: 'Space' },
        { label: '1', text: 'Number of Deals' },
        { label: 'No', text: 'Unlimited Page View' },
        { label: 'NA', text: 'Reporting' },
        { label: 'NA', text: 'Work with any device' },
        { label: 'Yes', text: 'Unlimited guides' },
        { label: 'NA', text: 'RFQ' },
        { label: 'NA', text: 'Featured Deals' },
      ],
    },
    {
      title: 'Partner',
      price: '$00/Year',
      buttonText: 'Get Started',
      features: [
        { label: 'No', text: 'Space' },
        { label: '1', text: 'Number of Deals' },
        { label: 'No', text: 'Unlimited Page View' },
        { label: 'NA', text: 'Reporting' },
        { label: 'NA', text: 'Work with any device' },
        { label: 'Yes', text: 'Unlimited guides' },
        { label: 'NA', text: 'RFQ' },
        { label: 'NA', text: 'Featured Deals' },
      ],
    },
    {
      title: 'Prime',
      price: '$00/Year',
      buttonText: 'Get Started',
      features: [
        { label: 'No', text: 'Space' },
        { label: '1', text: 'Number of Deals' },
        { label: 'No', text: 'Unlimited Page View' },
        { label: 'NA', text: 'Reporting' },
        { label: 'NA', text: 'Work with any device' },
        { label: 'Yes', text: 'Unlimited guides' },
        { label: 'NA', text: 'RFQ' },
        { label: 'NA', text: 'Featured Deals' },
      ],
    },
    {
      title: 'Premier',
      price: '$00/Year',
      buttonText: 'Get Started',
      features: [
        { label: 'No', text: 'Space' },
        { label: '1', text: 'Number of Deals' },
        { label: 'No', text: 'Unlimited Page View' },
        { label: 'NA', text: 'Reporting' },
        { label: 'NA', text: 'Work with any device' },
        { label: 'Yes', text: 'Unlimited guides' },
        { label: 'NA', text: 'RFQ' },
        { label: 'NA', text: 'Featured Deals' },
      ],
    },
  ];

  return (
    <Layout>
    <DashboardCard>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StyledTypography variant="h1">Subscription Plan</StyledTypography>
      </Box>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        {pricingPlans.map((plan, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3} xl={3}>
            {/* Using xs={12}, sm={6}, md={3} to ensure all cards are on the same row in larger screens */}
            <PricingCard {...plan} />
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
    </Layout>
  );
};

export default Subscription;
