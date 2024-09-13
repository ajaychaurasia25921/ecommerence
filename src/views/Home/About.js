import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import Layout from './Layout';
const About = () => {

  return (
    <Layout>
    <Container sx={{ mt: 4 , mb:4}}>
      {/* Centered Heading */}
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
        }}
      >
        About Company
      </Typography>

      {/* Layout for Image and Description */}
      <Grid container spacing={2}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <img
              src="https://cdn.pixabay.com/photo/2024/05/20/15/17/flower-8775511_1280.jpg"
              alt="Company"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Paper>
        </Grid>

        {/* Description Section */}
        <Grid item xs={12} md={6}>
          <div style={{ padding: '16px' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: 2 }}
              gutterBottom
            >
              Company Heading
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              hendrerit risus ut diam gravida, nec congue orci posuere. Donec
              facilisis ante id turpis dictum, at vestibulum quam posuere. Sed
              faucibus magna ut urna scelerisque,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              hendrerit risus ut diam gravida, nec congue orci posuere. Donec
              facilisis ante id turpis dictum, at vestibulum quam posuere. Sed
              faucibus magna ut urna scelerisque,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              hendrerit risus ut diam gravida, nec congue orci posuere. Donec
              facilisis ante id turpis dictum, at vestibulum quam posuere. Sed
              faucibus magna ut urna scelerisque,  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              hendrerit risus ut diam gravida, nec congue orci posuere. Donec
              facilisis ante id turpis dictum, at vestibulum quam posuere. Sed
              faucibus magna ut urna scelerisque, sed commodo dolor feugiat.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
    </Layout>
  );
};

export default About;
