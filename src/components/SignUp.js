import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new user
      const response = await axios.post('/users', userDetails);
      setMessage('User signed up successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error signing up. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box 
      sx={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 3,
        backgroundColor: '#f0f8ff', // Light blue background
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: '#007fff', textAlign: 'center' }}>
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={userDetails.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={userDetails.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: '#007fff',
            color: '#fff',
            '&:hover': { backgroundColor: '#0059b3' }
          }}
        >
          Sign Up
        </Button>
      </form>

      {message && (
        <Alert severity={message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default Signup;
