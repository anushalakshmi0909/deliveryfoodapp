import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from '../api/axiosInstance';
import './Menu.css'; // Add a CSS file for styling

const Menu = ({ orders, setOrders }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from the backend (or mock data)
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const addToOrders = (item) => {
    setOrders([...orders, item]);
  };

  return (
    <Box className="menu-container">
      <Typography variant="h4" sx={{ mb: 4 }} className="menu-title">
        Our Menu
      </Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card className="menu-item-card">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: ₹{item.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => addToOrders(item)}
                >
                  Add to Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Menu;
