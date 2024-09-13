
const handleChange = (e) => {
    setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
};

const handleSubmit = async () => {
    // Validate fields before submitting
    let isValid = true;
    const errors = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
    };

    // Check required fields
    if (!newAgent.first_name.trim()) {
        errors.first_name = 'First Name is required';
        isValid = false;
    }
    if (!newAgent.last_name.trim()) {
        errors.last_name = 'Last Name is required';
        isValid = false;
    }
    if (!newAgent.email.trim()) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newAgent.email)) {
        errors.email = 'Invalid email format';
        isValid = false;
    }
    if (!newAgent.password.trim()) {
        errors.password = 'Password is required';
        isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(newAgent.password)) {
        errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character';
        isValid = false;
    }
    if (!newAgent.phone.trim()) {
        errors.phone = 'Phone is required';
        isValid = false;
    } else if (!/^\d{10}$/.test(newAgent.phone)) {  // Adjust regex based on the required phone number format
        errors.phone = 'Invalid phone number format';
        isValid = false;
    }

    if (!isValid) {
        setFormErrors(errors);
        return; // Exit if any field is empty
    }

    try {
        const response = await axios.post('http://134.209.145.149:9999/api/createAgent', newAgent);
        setAgents([...agents, response.data.data]);  // Adjust based on actual response structure
        setNewAgent({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
        }); // Reset form data
        handleClose();
        toast.success('New agent added successfully!');
    } catch (err) {
        console.error('Error adding new agent:', err);
        toast.error('Failed to add new agent.');
    }
};