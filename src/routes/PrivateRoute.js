import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock authentication check function
const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return localStorage.getItem('accessToken') !== null;
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
