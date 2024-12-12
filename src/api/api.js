// src/api.js
import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'http://localhost:3001+'; // Replace with your actual API endpoint

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/restaurants`); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
