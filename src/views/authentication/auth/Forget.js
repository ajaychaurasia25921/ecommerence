import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Styled Paper component for the form container
const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  background: theme.palette.background.paper,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  // Adding a gradient effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(to bottom, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 100%)`,
    opacity: 0.2,
    zIndex: 0,
  },
}));

// Styled Button for a more modern look
const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    background: theme.palette.primary.dark,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 50,
    left: 50,
    width: '200%',
    height: '200%',
    background: theme.palette.primary.dark,
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.3s ease',
    zIndex: -1,
  },
  '&:hover::before': {
    transform: 'translate(-50%, -50%) scale(1.5)',
  },
}));

function Forget() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is not valid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://134.209.145.149:9999/api/forget-password', { email });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Password reset link sent to your email',
        timer: 3000,
        timerProgressBar: true,
        willClose: () => navigate('/auth/login'),
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" paragraph>
          Enter your email address to receive a password reset link.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginBottom: 2 }}
            label="Email Address"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <StyledButton
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </StyledButton>
        </form>
      </StyledPaper>
    </Container>
  );
}

export default Forget;
