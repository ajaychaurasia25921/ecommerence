import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, TextField,
    Table, TableBody, TableCell, TableHead, TableRow, Chip, Skeleton
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import NoData from "src/assets/images/products/NoData.jpg";// Replace with your actual path

const CustomerDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.post('http://134.209.145.149:9999/api/userType', { user_type: "CU" });
                console.log(response.data);  // Debugging: Check the structure of the API response
                setCustomers(response.data.data);  // Adjust based on actual response structure
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    // Check if customers is an array before mapping
    if (!Array.isArray(customers)) {
        return <Typography>Error: Unexpected data format</Typography>;
    }

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2">
                    Customer Dashboard
                </Typography>
                {/* <TextField
                    label="Search customers"
                    variant="outlined"
                    sx={{ width: '100%', maxWidth: 300, mt: 2 }}
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
            </Box>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Phone
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(5)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={40} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            filteredCustomers.map((customer) => (
                                <TableRow key={customer.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                    <TableCell>
                                        <Typography sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                        >
                                            {customer.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {customer.first_name} {customer.last_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary">
                                            {customer.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary">
                                            {customer.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: customer.status ? 'success.main' : 'error.main',
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={customer.status ? 'Active' : 'Inactive'}
                                        ></Chip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {customers.length === 0 && !loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <img src={NoData} alt="No data available" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Box>
                )}
            </Box>
        </DashboardCard>
    );
};

export default CustomerDashboard;
