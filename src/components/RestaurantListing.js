import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import Rating from './Rating';
import MenuList from './MenuList'; // Import MenuList
import './RestaurantListing.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RestaurantListing = () => {
  const [restaurantRatings, setRestaurantRatings] = useState([]); // Stores restaurants data
  const [open, setOpen] = useState(false); // Controls add restaurant dialog
  const [editMode, setEditMode] = useState(false); // Toggles between add and edit modes
  const [currentRestaurant, setCurrentRestaurant] = useState(null); // Tracks restaurant being edited or added
  const [newRestaurant, setNewRestaurant] = useState({ name: '', category: '', rating: 0 }); // Form state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // For showing the menu

  // Fetch restaurants from db.json using Axios
  useEffect(() => {
    axios.get('http://localhost:3001/restaurants')
      .then((response) => {
        setRestaurantRatings(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the restaurant data!', error);
      });
  }, []);

  // Handle opening the Add/Edit Restaurant dialog
  const handleClickOpen = (restaurant = null) => {
    setCurrentRestaurant(restaurant); // If editing, set the restaurant to be edited
    if (restaurant) {
      setNewRestaurant({ name: restaurant.name, category: restaurant.category, rating: restaurant.rating });
      setEditMode(true);
    } else {
      setNewRestaurant({ name: '', category: '', rating: 0 });
      setEditMode(false);
    }
    setOpen(true);
  };

  // Handle closing the Add/Edit dialog
  const handleClose = () => {
    setOpen(false);
    setNewRestaurant({ name: '', category: '', rating: 0 }); // Reset form values
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };

  // Handle form submission to add a new restaurant
  const handleAddRestaurant = () => {
    const restaurantToAdd = { ...newRestaurant, id: restaurantRatings.length + 1 };

    axios.post('http://localhost:3001/restaurants', restaurantToAdd)
      .then((response) => {
        setRestaurantRatings([...restaurantRatings, response.data]);
      })
      .catch((error) => {
        console.error('There was an error adding the restaurant!', error);
      });

    handleClose();
  };

  // Handle form submission to edit an existing restaurant
  const handleEditRestaurant = () => {
    const updatedRestaurant = { ...currentRestaurant, ...newRestaurant };

    axios.put(`http://localhost:3001/restaurants/${currentRestaurant.id}`, updatedRestaurant)
      .then((response) => {
        setRestaurantRatings(restaurantRatings.map((restaurant) => (restaurant.id === currentRestaurant.id ? response.data : restaurant)));
      })
      .catch((error) => {
        console.error('There was an error updating the restaurant!', error);
      });

    handleClose();
  };

  // Handle deleting a restaurant
  const handleDeleteRestaurant = (id) => {
    axios.delete(`http://localhost:3001/restaurants/${id}`)
      .then(() => {
        setRestaurantRatings(restaurantRatings.filter((restaurant) => restaurant.id !== id));
      })
      .catch((error) => {
        console.error('There was an error deleting the restaurant!', error);
      });
  };

  // Handle selecting a restaurant to show the menu
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant); // Set the selected restaurant
  };

  const handleRatingChange = (id, newRating) => {
    setRestaurantRatings((prevRatings) =>
      prevRatings.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, userRating: newRating } : restaurant
      )
    );
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Restaurant Listings
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
          Add Restaurant
        </Button>
      </Box>

      <Grid container spacing={3}>
        {restaurantRatings.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card sx={{ minWidth: 275 }} className='cards' onClick={() => handleSelectRestaurant(restaurant)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {restaurant.category}
                </Typography>
                <Rating
                  rating={restaurant.userRating || restaurant.rating}
                  setRating={(newRating) => handleRatingChange(restaurant.id, newRating)}
                />

                {/* Edit and Delete buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <IconButton color="primary" onClick={() => handleClickOpen(restaurant)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteRestaurant(restaurant.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Render MenuList when a restaurant is selected */}
      {selectedRestaurant && <MenuList restaurant={selectedRestaurant} />}

      {/* Add/Edit Restaurant Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Restaurant' : 'Add a New Restaurant'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the restaurant.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Restaurant Name"
            name="name"
            fullWidth
            value={newRestaurant.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            fullWidth
            value={newRestaurant.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Rating"
            name="rating"
            type="number"
            fullWidth
            value={newRestaurant.rating}
            onChange={handleInputChange}
            inputProps={{ min: 0, max: 5 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={editMode ? handleEditRestaurant : handleAddRestaurant} color="primary">
            {editMode ? 'Update Restaurant' : 'Add Restaurant'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestaurantListing;
