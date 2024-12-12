// src/components/Orders.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Paper, Divider } from '@mui/material';
import axios from '../api/axiosInstance';
import './Orders.css'; // Custom CSS for blue & white theme

const Orders = ({ orders, setOrders }) => {

  const removeOrder = async (id) => {
    try {
      // Send a DELETE request to remove an order
      await axios.delete(`/orders/${id}`);
      setOrders(orders.filter((order) => order.id !== id)); // Remove from state
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#f0faff' }}>
        <Typography variant="h4" color="primary" gutterBottom textAlign="center">
          My Orders
        </Typography>
        {orders.length > 0 ? (
          <List>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ backgroundColor: '#e3f2fd', borderRadius: '8px', mb: 2 }}>
                  <ListItemText
                    primary={order.name}
                    secondary={`₹${order.price}`}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeOrder(order.id)}
                    sx={{ marginLeft: '10px' }}
                  >
                    Remove
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary" textAlign="center">
            You have no orders yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Orders;
