import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, FormControlLabel, Checkbox, Grid, Button, IconButton, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomPermission = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the user's permissions
                const permissionsResponse = await axios.post('http://134.209.145.149:9999/api/getCPermissions', { user_id: userId });
                const { user_firstname, user_lastname, permissions: userPermissions } = permissionsResponse.data;

                // Set the user's name
                setUserName(`${user_firstname} ${user_lastname}`);

                // Fetch the menu list
                const menuResponse = await axios.get('http://134.209.145.149:9999/api/menuList');
                const fetchedMenuList = Array.isArray(menuResponse.data.data) ? menuResponse.data.data : [];

                // Initialize permissions with the fetched menu list
                const initialPermissions = fetchedMenuList.map(menu => ({
                    name: menu.name,
                    hasPermission: userPermissions.some(permission => permission.menu_name === menu.name)
                }));

                setMenuList(fetchedMenuList);
                setPermissions(initialPermissions);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const handleCheckboxChange = (index) => {
        const updatedPermissions = [...permissions];
        updatedPermissions[index].hasPermission = !updatedPermissions[index].hasPermission;
        setPermissions(updatedPermissions);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                user_id: parseInt(userId),
                permissions: permissions.map(permission => ({
                    name: permission.name,
                    hasPermission: permission.hasPermission
                }))
            };
            await axios.post('http://134.209.145.149:9999/api/cPermission', payload);
            toast.success('Permissions updated successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (err) {
            toast.error('Failed to update permissions.');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4" gutterBottom>
                    {userName}
                </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Permission List
                    </Typography>
                    <Grid container spacing={2}>
                        {menuList.map((menu, index) => (
                            <Grid item xs={12} sm={6} md={3} key={menu.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={permissions[index]?.hasPermission || false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    }
                                    label={menu.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
            <ToastContainer />
        </DashboardCard>
    );
};

export default CustomPermission;
