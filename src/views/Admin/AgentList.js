import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, TextField,
    FormControl, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableHead, TableRow, Chip, Skeleton, Switch, Button,
    Dialog, Pagination, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import DashboardCard from 'src/components/shared/DashboardCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoData from "src/assets/images/products/NoData.jpg";

const AgentList = () => {
    const navigate = useNavigate();

    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [userId, setUserId] = useState(null); // Track the user ID for OTP verification
    const [otp, setOtp] = useState(''); // Track OTP input
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [newAgent, setNewAgent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
    });

    const [formErrors, setFormErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        otp: '',
    });
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const [selectedOption, setSelectedOption] = useState('all');

    useEffect(() => {
        fetchAgents();
    }, [selectedOption]);

    const fetchAgents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://134.209.145.149:9999/api/listUser?role_id=3', {
                params: { status: selectedOption }
            });
            setAgents(response.data.users);
            setTotalUsers(response.data.total_users); 
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange1 = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleToggleStatus = async (agentId, currentStatus) => {
        try {
            const updatedAgents = agents.map(agent =>
                agent.id === agentId ? { ...agent, status: !currentStatus } : agent
            );
            setAgents(updatedAgents);

            await axios.put(`http://134.209.145.149:9999/api/toggle_user_status/${agentId}`);
            Swal.fire({
                icon: 'success',
                title: 'Status Updated',
                text: `${updatedAgents.find(agent => agent.id === agentId).first_name} is now ${!currentStatus ? 'active' : 'inactive'}.`,
            });
            fetchAgents(); 
        } catch (err) {
            fetchAgents(); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update agent status.',
            });
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setFormErrors({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            otp: '',
        });
    };

    const handleClose = () => {
        setOpen(false);
        setNewAgent({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
        });
        setOtpSent(false);
        setOtp('');
    };

    const handleChange = (e) => {
        setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};
        if (!newAgent.first_name.trim()) {
            errors.first_name = 'First Name is required';
            valid = false;
        }
        if (!newAgent.last_name.trim()) {
            errors.last_name = 'Last Name is required';
            valid = false;
        }
        if (!newAgent.email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(newAgent.email)) {
            errors.email = 'Email is not valid';
            valid = false;
        }
        if (!newAgent.password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        } else if (!/(?=.*[A-Za-z])(?=.*\W).{6,}/.test(newAgent.password)) {
            errors.password = 'Password must contain at least one alphabet, one special character, and be at least 6 characters long';
            valid = false;
        }
        if (!newAgent.phone.trim()) {
            errors.phone = 'Phone is required';
            valid = false;
        } else if (!/^\d{10}$/.test(newAgent.phone)) {
            errors.phone = 'Invalid phone number format';
            valid = false;
        }
        if (otpSent) {
            if (!otp.trim()) {
                errors.otp = 'OTP is required';
                valid = false;
            }
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post('http://134.209.145.149:9999/api/register', {
                ...newAgent,
                role_id: 3,
            });
            setUserId(response.data.uid);
            toast.success('Agent created successfully! Please verify the OTP sent to your email.');
            setOtpSent(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "Username already exists") {
                toast.error('Username already exists. Please choose a different username.');
            } else {
                toast.error('Failed to create agent.');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleSendOtp = async () => {
        if (!newAgent.email.trim()) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email is required to send OTP',
            }));
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://134.209.145.149:9999/api/otp', { email: newAgent.email });
            toast.success('OTP sent to your email');
        } catch (error) {
            toast.error('Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim()) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                otp: 'OTP is required',
            }));
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://134.209.145.149:9999/api/verify-otp', {
                user_id: userId,
                otp_code: otp,
            });
            toast.success('OTP verified successfully');
            handleClose(); // Close the modal upon successful verification
            fetchAgents(); // Refresh the agents list after successful OTP verification
        } catch (error) {
            toast.error('Failed to verify OTP.');
        } finally {
            setLoading(false);
        }
    };

    const filteredAgents = agents?.filter(agent =>
        (selectedOption === 'all' || (selectedOption === 1 && agent?.status) || (selectedOption === 0 && !agent.status)) && (
            agent?.first_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            agent?.last_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            agent?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            agent?.phone?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
    );

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    if (!Array.isArray(agents)) {
        return <Typography>Error: Unexpected data format</Typography>;
    }

    return (
        <DashboardCard>
            <ToastContainer />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Agent List
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="medium"
                        label="Search Agents"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FormControl variant="outlined" size="medium">
                        <InputLabel>Select</InputLabel>
                        <Select
                            value={selectedOption}
                            onChange={handleChange1}
                            label="Select"
                            sx={{ height: '100%', minWidth: '120px' }}
                        >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleOpen}
                    >
                        Add Agent
                    </Button>
                </Box>
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
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Phone
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                            {/* <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    {/* <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell> */}
                                </TableRow>
                            ))
                        ) : (
                            filteredAgents.map((agent, index) => (
                                <TableRow key={agent.id}>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {index + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {agent.first_name} {agent.last_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2">
                                            {agent.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2">
                                            {agent.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={agent.status ? 'Active' : 'Inactive'}
                                            color={agent.status ? 'success' : 'error'}
                                            sx={{ borderRadius: '4px', fontSize: '0.8rem' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={agent.status}
                                            onChange={() => handleToggleStatus(agent.id, agent.status)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    {/* <TableCell>
                                        <Button variant="contained" color="primary" size="small"
                                            onClick={() => navigate(`/custom-permissions/${agent.id}`)}
                                        >
                                            View
                                        </Button>
                                    </TableCell> */}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {filteredAgents.length === 0 && !loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <img height="400px" src={NoData} alt="No data" />
                    </Box>
                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={Math.ceil(totalUsers / usersPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
            {/* Add Agent Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Agent</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate>
                        <TextField
                            margin="dense"
                            name="first_name"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={newAgent.first_name}
                            onChange={handleChange}
                            error={Boolean(formErrors.first_name)}
                            helperText={formErrors.first_name}
                        />
                        <TextField
                            margin="dense"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={newAgent.last_name}
                            onChange={handleChange}
                            error={Boolean(formErrors.last_name)}
                            helperText={formErrors.last_name}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={newAgent.email}
                            onChange={handleChange}
                            error={Boolean(formErrors.email)}
                            helperText={formErrors.email}
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={newAgent.password}
                            onChange={handleChange}
                            error={Boolean(formErrors.password)}
                            helperText={formErrors.password}
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            label="Phone"
                            type="number"
                            fullWidth
                            value={newAgent.phone}
                            onChange={handleChange}
                            error={Boolean(formErrors.phone)}
                            helperText={formErrors.phone}
                        />
                        {otpSent && (
                            <TextField
                                margin="dense"
                                name="otp"
                                label="OTP"
                                type="number"
                                fullWidth
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                error={Boolean(formErrors.otp)}
                                helperText={formErrors.otp}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {otpSent ? (
                        <LoadingButton
                            onClick={handleVerifyOtp}
                            loading={loading}
                            variant="contained"
                            color="primary"
                        >
                            Verify OTP
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            onClick={handleSubmit}
                            loading={loading}
                            variant="contained"
                            color="primary"
                        >
                            Create Agent
                        </LoadingButton>
                    )}
                </DialogActions>
            </Dialog>
        </DashboardCard>
    );
};

export default AgentList;
