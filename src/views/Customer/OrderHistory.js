import React from 'react';
import { Card, CardContent, CardHeader, Typography, Divider, Box, Grid } from '@mui/material';

// Sample data for orders
const sampleOrders = [
    { id: '1', date: '2024-08-20', total: '$150.00', status: 'Shipped' },
    { id: '2', date: '2024-08-18', total: '$75.00', status: 'Pending' },
    { id: '3', date: '2024-08-15', total: '$200.00', status: 'Delivered' },
    // Add more sample data as needed
];

const OrderHistory = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>
            <Grid container spacing={3}>
                {sampleOrders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <Card variant="outlined">
                            <CardHeader
                                title={`Order #${order.id}`}
                                subheader={`Date: ${order.date}`}
                                sx={{ backgroundColor: 'background.default' }}
                            />
                            <Divider />
                            <CardContent>
                                <Typography variant="h6">Total: {order.total}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Status: {order.status}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OrderHistory;
