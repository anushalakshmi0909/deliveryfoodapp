import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import MenuList from './MenuList'; // Component to display the menu

const RestaurantList = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: '#007fff' }}>
        Restaurants
      </Typography>
      <Grid container spacing={2}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.category}
                </Typography>
                <Typography variant="body2">Rating: {restaurant.rating}/5</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleRestaurantSelect(restaurant)}
                >
                  View Menu
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Show MenuList if a restaurant is selected */}
      {selectedRestaurant && (
        <MenuList
          restaurant={selectedRestaurant}
        />
      )}
    </Box>
  );
};

export default RestaurantList;
