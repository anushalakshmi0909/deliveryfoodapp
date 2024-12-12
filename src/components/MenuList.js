import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import './MenuList.css'; // Import the CSS file

const MenuList = ({ restaurant }) => {
  // Static menu data specific to each restaurant
  const restaurantMenus = {
    'Hotel Udupi': [
      { id: 1, name: 'Pizza Margherita', price: 350, description: 'Classic cheese and tomato pizza' },
      { id: 2, name: 'Paneer Butter Masala', price: 200, description: 'Paneer cubes in rich creamy butter masala sauce' },
      { id: 3, name: 'Tandoori Chicken', price: 450, description: 'Grilled chicken with Indian spices' },
    ],
    'ss Hyderabad': [
      { id: 1, name: 'Veg Biryani', price: 180, description: 'Fragrant rice with vegetables and spices' },
      { id: 2, name: 'Butter Naan', price: 50, description: 'Soft flatbread with butter' },
      { id: 3, name: 'Gulab Jamun', price: 100, description: 'Sweet milk-based dessert soaked in syrup' },
    ],
    'Lava cakes': [
      { id: 1, name: 'Chicken Shawarma', price: 250, description: 'Grilled chicken in pita bread with sauce' },
      { id: 2, name: 'Falafel', price: 150, description: 'Fried chickpea balls served with sauce' },
      { id: 3, name: 'Hummus and Pita', price: 120, description: 'Creamy hummus served with pita bread' },
    ],
  };

  const menuItems = restaurantMenus[restaurant.name] || [];

  return (
    <Box className="menu-container">
      <Typography className="menu-title">
        {restaurant.name} - Menu
      </Typography>

      <Grid container spacing={2}>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card className="menu-card">
                <CardContent className="menu-card-content">
                  <Typography className="menu-item-name">{item.name}</Typography>
                  <Typography className="menu-item-description">{item.description}</Typography>
                  <Typography className="menu-item-price">Price: ₹{item.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', width: '100%' }}>
            No menu available for {restaurant.name}.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MenuList;
