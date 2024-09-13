import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { styled } from '@mui/system';
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  textTransform: 'uppercase',
}));
const ContactUs = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    subject: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.name) errors.name = 'Name is required';
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formValues.mobile) errors.mobile = 'Mobile number is required';
    if (!formValues.address) errors.address = 'Address is required';
    if (!formValues.subject) errors.subject = 'Subject is required';
    if (!formValues.description) errors.description = 'Description is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      console.log('Form submitted:', formValues);
    }
  };

  return (
    <Layout>
      <Container sx={{ mt: 4, mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledTypography variant="h1">Contact Us</StyledTypography>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={2}>
            {[
              { label: 'Name', name: 'name' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Mobile Number', name: 'mobile' },
              { label: 'Address', name: 'address' },
              { label: 'Subject', name: 'subject' },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileFocus={{ scale: 1.05 }}
                >
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || 'text'}
                    value={formValues[field.name]}
                    onChange={handleChange}
                    error={!!formErrors[field.name]}
                    helperText={formErrors[field.name]}
                    sx={{
                      mb: 2,
                      backgroundColor: 'white',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </motion.div>
              </Grid>
            ))}
            <Grid item xs={12}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              >
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formValues.description}
                  onChange={handleChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  sx={{
                    mb: 2,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.5, mt: 2 }}
                >
                  Submit
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </motion.form>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
              Thank you for contacting us! We will get back to you soon.
            </Typography>
          </motion.div>
        )}
      </Container>
    </Layout>
  );
};

export default ContactUs;
