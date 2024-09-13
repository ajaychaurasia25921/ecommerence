import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress, Avatar } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const ForgetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
   const[token,setToken] = useState('');
    const { resetToken } = useParams();
    
    const secretKey = 'itsmehere';
    const [decryptedData, setDecryptedData] = useState(null);
    const navigate = useNavigate();

    console.log(resetToken,"data one is ===>>>")

    useEffect(()=>{
        setToken(resetToken);
    },[resetToken])
    // useEffect(() => {
    //     try {
    //         // Function to decrypt data
    //         const decryptData = (data1, key) => {
    //             const bytes = CryptoJS.AES.decrypt(data1, key);
    //             return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //         };

    //         // Decrypt the data
    //         const decodedData = decryptData(decodeURIComponent(data1), secretKey);
    //         console.log(decodedData[0].email, "decrypted data is ===>>>");
    //         setDecryptedData(decodedData);
    //     } catch (error) {
    //         console.error('Decryption error:', error);
    //         toast.error('Invalid or corrupted reset link.');
    //     }
    // }, [data1]);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setLoading(false);
            setPasswordError('Passwords do not match');
            return;
        }

        if (!/(?=.*[A-Za-z])(?=.*\W).{6,}/.test(newPassword)) {
            setLoading(false);
            setPasswordError('Password must contain at least one alphabet, one special character, and be at least 6 characters long');
            return;
        }

        try {
            const response = await fetch(`http://134.209.145.149:9999/api/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password:newPassword}), // Include decrypted data in the request
            });

            const result = await response.json();
            setLoading(false);

            console.log('API response:', result); // Log the entire response

            if (response.ok) {
                toast.success('Password reset successfully');
                navigate('/auth/login');
            } else {
                // Log the errors if any
                if (result.errors && result.errors.length > 0) {
                    console.log('Errors:', result.errors);
                    toast.error(result.errors[0].message);
                } else {
                    toast.error(result.message || 'Something went wrong');
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                        backgroundColor: '#f7f7f7',
                        borderRadius: 2,
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    {token ? (
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                error={!!passwordError}
                                helperText={passwordError && passwordError.includes('Passwords') ? passwordError : ''}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                error={!!passwordError}
                                helperText={passwordError && !passwordError.includes('Passwords') ? passwordError : ''}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant="body1" color="error">
                            Invalid or corrupted reset link.
                        </Typography>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default ForgetPassword;
