import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({ email: '', password: '', otp: '' });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [otpRequired, setOtpRequired] = useState(false);
    const [userId, setUserId] = useState(null); // State for user ID
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is not valid';
            valid = false;
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        }
        if (otpRequired && !formData.otp.trim()) { // Validate OTP only if required
            errors.otp = 'OTP is required';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const verifyOtp = async () => {
        if (!formData.otp.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'OTP is required.',
            });
            return;
        }

        setLoading(true);
        try {
            console.log('Sending OTP verification request with:', {
                user_id: userId,
                otp_code: formData.otp,
            });

            const response = await axios.post('http://134.209.145.149:9999/api/verify-otp', {
                user_id: userId,
                otp_code: formData.otp,
            });

            console.log('OTP verification response:', response);

            const { token, user } = response.data;
            localStorage.setItem('accessToken', token);
            // localStorage.setItem('uid', user.id);
            localStorage.setItem('email', user.email);
            localStorage.setItem('role_id', user.role_id);

            navigate('/dashboard');
        } catch (error) {
            console.error('Error in OTP verification:', error);
            let errorMessage = 'An error occurred. Please try again.';
            if (error.response) {
                const statusCode = error.response.status;
                const apiMessage = error.response.data.message;

                if (statusCode >= 400 && statusCode < 500) {
                    errorMessage = `Client error: ${apiMessage || 'An error occurred on your request. Please check and try again.'}`;
                } else if (statusCode >= 500) {
                    errorMessage = `Server error: ${apiMessage || 'An error occurred on the server. Please try again later.'}`;
                } else {
                    errorMessage = apiMessage || errorMessage;
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your internet connection and try again.';
            } else {
                errorMessage = `Unexpected error: ${error.message}`;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };
    const resendOtp = async () => {
        if (!formData.email.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email is required to resend OTP.',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://134.209.145.149:9999/api/resend-otp', {
                email: formData.email,
            });

            console.log('OTP resend response:', response);

            Swal.fire({
                icon: 'success',
                title: 'OTP Resent',
                text: 'An OTP has been sent to your email.',
            });
        } catch (error) {
            console.error('Error in OTP resend:', error);
            let errorMessage = 'An error occurred. Please try again.';
            if (error.response) {
                const statusCode = error.response.status;
                const apiMessage = error.response.data.message;

                if (statusCode >= 400 && statusCode < 500) {
                    errorMessage = `Client error: ${apiMessage || 'An error occurred on your request. Please check and try again.'}`;
                } else if (statusCode >= 500) {
                    errorMessage = `Server error: ${apiMessage || 'An error occurred on the server. Please try again later.'}`;
                } else {
                    errorMessage = apiMessage || errorMessage;
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your internet connection and try again.';
            } else {
                errorMessage = `Unexpected error: ${error.message}`;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://134.209.145.149:9999/api/login', formData);
            const { token, user, error, status, message, user_id } = response.data;

            if (error === 'otp' && status === 0) {

                // Ensure user_id is properly set
                if (user_id) {
                    setUserId(user_id);
                } else {
                    console.error('user_id is not available in the response');
                }

                Swal.fire({
                    icon: 'info',
                    title: 'Verify Your Account',
                    text: message,
                });
                setOtpRequired(true); // Show OTP input
                setLoading(false);
                return;
            }

            localStorage.setItem('accessToken', token);
            localStorage.setItem('uid', user.id);
            localStorage.setItem('email', user.email);
            localStorage.setItem('role_id', user.role_id);

            switch (user.role_id) {
                case 1:
                case 2:
                case 3:
                case 4:
                    navigate('/dashboard');
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Unauthorized Access',
                        text: 'You do not have permission to access this page.',
                    });
                    break;
            }
        } catch (error) {
            console.error('Full error response:', error);

            let errorMessage = 'An error occurred. Please try again.';
            if (error.response) {
                const statusCode = error.response.status;
                const apiErrors = error.response.data.errors;
                const apiMessage = error.response.data.message;

                if (statusCode >= 400 && statusCode < 500) {
                    errorMessage = `Client error: ${apiMessage || 'An error occurred on your request. Please check and try again.'}`;
                } else if (statusCode >= 500) {
                    errorMessage = `Server error: ${apiMessage || 'An error occurred on the server. Please try again later.'}`;
                }

                if (apiErrors) {
                    if (Array.isArray(apiErrors)) {
                        errorMessage = apiErrors.map(err => err.message).join(' ') || errorMessage;
                    } else if (typeof apiErrors === 'object') {
                        errorMessage = Object.values(apiErrors).join(' ') || errorMessage;
                    }
                } else if (apiMessage) {
                    errorMessage = apiMessage;
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your internet connection and try again.';
            } else {
                errorMessage = `Unexpected error: ${error.message}`;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });

            // Check if the error is related to OTP
            if (error.response && error.response.data.error === 'otp' && error.response.data.status === 0) {
                setUserId(error.response.data.user_id);
                Swal.fire({
                    icon: 'info',
                    title: 'Verify Your Account',
                    text: error.response.data.message,
                });
                setOtpRequired(true); // Show OTP input
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px">
                            Email
                        </Typography>
                        <CustomTextField
                            id="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px">
                            Password
                        </Typography>
                        <CustomTextField
                            id="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            autoComplete="new-password"
                        />
                    </Box>

                    {/* OTP Field - Only show if OTP is required */}
                    {otpRequired && (
                        <>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='otp' mb="5px">
                                    OTP
                                </Typography>
                                <CustomTextField
                                    id="otp"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.otp}
                                    onChange={handleChange}
                                    error={!!formErrors.otp}
                                    helperText={formErrors.otp}
                                    autoComplete="one-time-code"
                                />
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={verifyOtp}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Verify'}
                            </Button>
                            
                        </>
                    )}

                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        {otpRequired && (
                        <Typography
                            component="button"
                            onClick={resendOtp}
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            Resend OTP?
                        </Typography>
                        )}
                        
                        <Typography
                            component="button"
                            onClick={() => navigate('/auth/forget')}
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            Forgot Password?
                        </Typography>
                       
                    </Stack>
                    {!otpRequired && (
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign In'}
                        </Button>
                    )}
                </Stack>
            </form>

            {subtitle}
        </>
    );
};

export default AuthLogin;
