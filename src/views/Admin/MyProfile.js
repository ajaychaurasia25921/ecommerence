import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    TextField,
    Button,
    Box,
    Divider,
    Rating,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';

const fadeIn = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const AnimatedCard = styled(Card)`
  animation: fadeIn 0.5s ease-in-out;
  ${fadeIn}
`;

const MyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: '',
        postal_code: '',
        address_line1: '',
        city: '',
        desc: '',
        dob: '',
        language: [],
        age: '',
        image: '',
        role_id: null,
        gallery: []
    });
    const [imageFile, setImageFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const [languages, setLanguages] = useState([]);

    const currentDate = new Date();
    const maxDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
    ).toISOString().split('T')[0];

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const uid = localStorage.getItem('uid');
                if (!uid) {
                    throw new Error('User ID not found');
                }
                const response = await axios.get(`http://134.209.145.149:9999/api/user-info?user_id=${uid}`);
                if (response.data) {
                    const profileData = response.data;

                    // Handle null or undefined values
                    setProfile(profileData);
                    setFormValues({
                        first_name: profileData.first_name || '',
                        last_name: profileData.last_name || '',
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        gender: profileData.gender || '',
                        postal_code: profileData.postal_code || '',
                        address_line1: profileData.address_line1 || '',
                        city: profileData.city || '',
                        desc: profileData.desc || '',
                        dob: profileData.dob || '',
                        language: profileData.language || [],
                        age: profileData.dob ? calculateAge(profileData.dob) : '',
                        image: profileData.image || '',
                        gallery: profileData.gallery || []
                    });
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile data');
            }
        };

        fetchProfile();
    }, []);


    // const [languages, setLanguages] = useState([]);

    // Fetch languages from API when the component mounts
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('http://134.209.145.149:9999/api/language');
                setLanguages(response.data); // Assuming API returns an object with a 'languages' array
            } catch (error) {
                console.error('Failed to fetch languages:', error);
            }
        };

        fetchLanguages();
    }, []);
    const handleInputChange = (e) => {
        const { name, value, type, multiple } = e.target;

        // Handle multiple select
        if (multiple) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: Array.from(e.target.selectedOptions, option => option.value),
            }));
        } else {
            // Update form values
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));

            // Phone number validation
            if (name === 'phone') {
                if (value.length > 10) return;
                if (isNaN(value) || value.length !== 10) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: 'Phone number must be 10 digits long',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: '',
                    }));
                }
            }

            // Postal code validation
            if (name === 'postal_code') {
                if (value.length > 6) return;
                if (isNaN(value) || value.length !== 6) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: 'Postal Code must be 6 digits long',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: '',
                    }));
                }
            }

            // Date of birth validation
            if (name === 'dob') {
                const age = calculateAge(value);
                if (age < 18) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        age: 'Age must be at least 18',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        age: '',
                    }));
                }
                setFormValues((prevValues) => ({
                    ...prevValues,
                    age,
                }));
            }
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryChange = async (event) => {
        const files = event.target.files;
        const uid = localStorage.getItem('uid');
        if (!uid) {
            alert('User ID not found');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('user_id', uid);

        try {
            const response = await axios.post('http://134.209.145.149:9999/api/gallery', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Images Uploaded successfully!',
                    showConfirmButton: false,
                    timer: 3000
                });
                // Handle success response
                console.log('Gallery images uploaded successfully');
                // Optionally refresh or update gallery list
                // fetchProfile(); // Fetch profile again if needed to update gallery state
            } else {
                throw new Error(response.data.message || 'Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            Swal.fire({
                title: 'Error',
                text: error.message || 'Failed to upload images',
                icon: 'error',
            });
        }
    };


    const handleImageDelete = (index) => {
        const updatedGallery = formValues.gallery.filter((_, i) => i !== index);
        setFormValues((prevValues) => ({
            ...prevValues,
            gallery: updatedGallery,
        }));
    };

    const handleSave = async () => {
        const newErrors = {};

        // Check required fields
        if (!formValues.first_name) newErrors.first_name = 'First name is required';
        if (!formValues.last_name) newErrors.last_name = 'Last name is required';
        if (!formValues.email) newErrors.email = 'Email is required';
        // Validate phone number
        if (!formValues.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (formValues.phone.length !== 10 || isNaN(formValues.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }
        if (!formValues.gender) newErrors.gender = 'Gender is required';
        // Validate postal code
        if (!formValues.postal_code) {
            newErrors.postal_code = 'Postal code is required';
        } else if (formValues.postal_code.length !== 6 || isNaN(formValues.postal_code)) {
            newErrors.postal_code = 'Postal code must be exactly 6 digits';
        }
        if (!formValues.address_line1) newErrors.address_line1 = 'Address is required';
        // if (!formValues.city) newErrors.city = 'City is required';
        if (!formValues.age) newErrors.age = 'Age is required';
        if (!formValues.dob) newErrors.dob = 'Date of birth is required';
        if (!formValues.language) newErrors.language = 'Language is required';
        if (!formValues.desc) newErrors.desc = 'Description is required';

        // Check if there are errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Set errors to state
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all required fields.',
                showConfirmButton: true,
                timer: 3000
            });
            return; // Stop the function from proceeding
        }

        // Proceed with saving data if there are no errors
        try {
            const uid = localStorage.getItem('uid');
            if (!uid) {
                throw new Error('User ID not found');
            }

            // Create a FormData object
            const formData = new FormData();
            formData.append('uid', uid);
            formData.append('first_name', formValues.first_name);
            formData.append('last_name', formValues.last_name);
            formData.append('email', formValues.email);
            formData.append('phone', formValues.phone);
            formData.append('gender', formValues.gender);
            formData.append('postal_code', formValues.postal_code);
            formData.append('address_line1', formValues.address_line1);
            // formData.append('city', formValues.city);
            formData.append('age', formValues.age);
            formData.append('dob', formValues.dob);
            formData.append('language', formValues.language);
            formData.append('desc', formValues.desc);

            // Append the image file to the formData if it's selected
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Optionally append gallery files
            // galleryFiles.forEach((file) => {
            //     formData.append('gallery', file);
            // });

            const response = await axios.put(`http://134.209.145.149:9999/api/users/${uid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                setProfile(formValues);
                setEditMode(false);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated successfully!',
                    showConfirmButton: false,
                    timer: 3000
                });
                
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
                window.location.reload();
               

            } else {
                throw new Error(response.data.Message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message || 'Failed to update profile');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to update profile',
            });
        }
    };




    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!profile) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    My Profile
                </Typography>


            </Box>
            {/* <Container> */}
            <ToastContainer />
            <AnimatedCard elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <CardContent>
                    <Grid container spacing={4} alignItems="center" direction="column">
                        <Grid item>
                            <Avatar
                                src={formValues.image || "/path/to/avatar.jpg"}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    bgcolor: 'primary.main',
                                    fontSize: 50,
                                    marginBottom: 2,
                                    cursor: editMode ? 'pointer' : 'default',
                                }}
                                onClick={editMode ? () => fileInputRef.current.click() : null}
                            >
                                {profile.first_name ? profile.first_name.charAt(0) : 'U'}
                            </Avatar>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                disabled={!editMode}
                            />
                        </Grid>
                        {profile?.role_id === 3 && (
                            <Grid container spacing={2} alignItems="center" direction="column">
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                        <strong>Rating:</strong>
                                    </Typography>
                                    <Rating value={4} readOnly />
                                </Grid>
                            </Grid>
                        )}


                        {editMode ? (
                            <>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="first_name"
                                            label="First Name"
                                            value={formValues.first_name}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.first_name}
                                            helperText={errors.first_name}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="last_name"
                                            label="Last Name"
                                            value={formValues.last_name}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.last_name}
                                            helperText={errors.last_name}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="email"
                                            label="Email"
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.email}
                                            disabled
                                            helperText={errors.email}

                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                        type='number'
                                            name="phone"
                                            label="Phone"
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.phone}
                                            helperText={errors.phone}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth required error={!!errors.gender}>
                                            <InputLabel>Gender</InputLabel>
                                            <Select
                                                name="gender"
                                                value={formValues.gender}
                                                onChange={handleInputChange}
                                                label="Gender"
                                            >

                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            type='number'
                                            name="postal_code"
                                            label="Postal code"
                                            value={formValues.postal_code}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.postal_code}
                                            helperText={errors.postal_code}

                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="address_line1"
                                            label="Address1"
                                            value={formValues.address_line1}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.address_line1}
                                            helperText={errors.address_line1}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="city"
                                            label="City"
                                            value={formValues.city}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.city}
                                            helperText={errors.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="dob"
                                            label="Date of Birth"
                                            type="date"
                                            value={formValues.dob}
                                            onChange={handleInputChange}
                                            fullWidth

                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                max: maxDate,
                                            }}
                                            error={!!errors.dob}
                                            helperText={errors.dob}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth required error={!!errors.language}>
                                            <InputLabel>Language</InputLabel>
                                            <Select
                                                name="language"
                                                value={formValues.language}
                                                onChange={handleInputChange}
                                                label="Language"
                                                multiple // Allow multiple selections
                                            >
                                                {/* Map over fetched languages to create MenuItem components */}
                                                {languages.map((lang) => (
                                                    <MenuItem key={lang.value} value={lang.id}>
                                                        {lang.name}
                                                    </MenuItem>
                                                ))}
                                                {/* Add a static option for 'other' */}
                                                {/* <MenuItem value="other">Other</MenuItem> */}
                                            </Select>
                                            {errors.language && <FormHelperText>{errors.language}</FormHelperText>}
                                        </FormControl>

                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="desc"
                                            label="Description"
                                            value={formValues.desc}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.desc}
                                            helperText={errors.desc}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            name="age"
                                            label="Age"
                                            value={formValues.age}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.age}
                                            helperText={errors.age}
                                            disabled

                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography>Gallery</Typography>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            ref={galleryInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleGalleryChange}
                                            disabled={!editMode}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => galleryInputRef.current.click()}
                                            disabled={!editMode}
                                        >
                                            Upload Gallery Images
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => setEditMode(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>

                            </>
                        ) : (
                            <>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>First Name:</strong> {profile.first_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Last Name:</strong> {profile.last_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Email:</strong> {profile.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Phone:</strong> {profile.phone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Gender:</strong> {profile.gender}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Zipcode:</strong> {profile.postal_code}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Address:</strong> {profile.address_line1}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>City:</strong> {profile.city}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Date of Birth:</strong> {profile.dob}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Gender:</strong> {profile.gender}
                                        </Typography>
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Age:</strong> {profile.age}
                                        </Typography>
                                    </Grid> */}
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                                <strong>Language:</strong> {profile.language_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="body1">
                                            <strong>Description:</strong> {profile.desc}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    {/* <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1">
                                                <strong>Description:</strong> {profile.desc}
                                    </Typography>
                                </Grid> */}
                                </Grid>
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                                        Edit
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Grid>
                </CardContent>
            </AnimatedCard>
            {/* </Container> */}
        </DashboardCard>
    );
};

export default MyProfile;
