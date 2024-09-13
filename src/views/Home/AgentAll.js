import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  IconButton,
  Box,
  Button,
  Rating,
  TextField,
  Pagination,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
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

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  textTransform: 'uppercase',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const AgentAll = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`http://134.209.145.149:9999/api/listUser?role_id=3&status=all&page=${page}`);
        if (response.data) {
          setAgents(response.data.users || []);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();
  }, [page]);

  const handleViewClick = (id) => {
    navigate(`/agentdetails/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Layout>
      <Container sx={{ mt: 4, mb: 2.5 }}>
        <StyledTypography variant="h1">Our Agents</StyledTypography>

        {/* Search Bar */}
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <StyledTextField
            variant="outlined"
            placeholder="Search agents"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: '100%', maxWidth: '300px' }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {agents.map((agent) => (
                <Grid item xs={12} sm={6} md={3} key={agent.id}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="180"
                      // image={agent.image}
                      image="https://images.pexels.com/photos/8462116/pexels-photo-8462116.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                      alt={agent.name}
                      sx={{ borderRadius: '50%', width: '60%', margin: '16px auto' }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {agent.name}
                        <StatusText online={agent.online} sx={{ marginLeft: 1 }}>
                          <StatusDot online={agent.online} />
                        </StatusText>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Age: {agent.age}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Location: {agent.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Language: {agent.language}
                      </Typography>
                      <Rating value={agent.rating} precision={0.5} readOnly sx={{ mb: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center' }}>
                        <IconButton aria-label="call" color="primary">
                          <PhoneIcon />
                        </IconButton>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleViewClick(agent.id)}
                        >
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AgentAll;
