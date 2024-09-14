import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Grid, TextField, Container,
  Select, FormControl, MenuItem, InputLabel, Snackbar, Alert
} from '@mui/material';
import Sidebar from './sidebar';
import { useParams } from 'react-router-dom';

const Editregisterform = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    ownerName: '',
    cuisine: '',
    website: '',
    operatingDays: [],
    restaurantName: '',
    restaurantDescription: '',
    address: '',
    phoneNumber: '',
    email: '',
    location: '',
    minDeliveryAmount: '',
    freeDeliveryAmount: '',
    deliveryFee: '',
    deliveryRadius: '',
    deliveryTimes: {
      Monday: { start: null, end: null },
      Tuesday: { start: null, end: null },
      // Populate all the days similarly
    },
    status: '',
    serviceType: '',
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/restaurants/${id}`); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }
        const selectedRestaurant = await response.json();

        setFormData({
          ownerName: selectedRestaurant.ownerName || '',
          cuisine: selectedRestaurant.cuisine || '',
          website: selectedRestaurant.website || '',
          operatingDays: selectedRestaurant.operatingDays || [],
          restaurantName: selectedRestaurant.restaurantName || '',
          restaurantDescription: selectedRestaurant.restaurantDescription || '',
          address: selectedRestaurant.address || '',
          phoneNumber: selectedRestaurant.phoneNumber || '',
          email: selectedRestaurant.email || '',
          location: selectedRestaurant.location || '',
          minDeliveryAmount: selectedRestaurant.minDeliveryAmount || '',
          freeDeliveryAmount: selectedRestaurant.freeDeliveryAmount || '',
          deliveryFee: selectedRestaurant.deliveryFee || '',
          deliveryRadius: selectedRestaurant.deliveryRadius || '',
          deliveryTimes: selectedRestaurant.deliveryTimes || {
            Monday: { start: null, end: null },
            Tuesday: { start: null, end: null },
            // Populate all the days similarly
          },
          status: selectedRestaurant.status || '',
          serviceType: selectedRestaurant.serviceType || '',
        });
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurants();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDaysChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      operatingDays: value,
    }));
  };

  const handleTimeChange = (day, type, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      deliveryTimes: {
        ...prevData.deliveryTimes,
        [day]: {
          ...prevData.deliveryTimes[day],
          [type]: newValue,
        },
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage('Restaurant updated successfully!');
      setOpen(true);
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('Failed to update restaurant.');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Sidebar />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={message.includes('successfully') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Edit Restaurant Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Restaurant Owner Name"
                variant="outlined"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="cuisine-select-label">Cuisine Type</InputLabel>
                <Select
                  labelId="cuisine-select-label"
                  id="cuisine-select"
                  name="cuisine"
                  value={formData.cuisine}
                  label="Cuisine Type"
                  onChange={handleChange}
                >
                  <MenuItem value="Italian">Italian</MenuItem>
                  <MenuItem value="Chinese">Chinese</MenuItem>
                  <MenuItem value="Indian">Indian</MenuItem>
                  <MenuItem value="Mexican">Mexican</MenuItem>
                  <MenuItem value="American">American</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Website URL"
                variant="outlined"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="days-select-label">Operating Days</InputLabel>
                <Select
                  labelId="days-select-label"
                  id="days-select"
                  name="operatingDays"
                  value={formData.operatingDays}
                  label="Operating Days"
                  multiple
                  onChange={handleDaysChange}
                >
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Restaurant Name"
                variant="outlined"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Restaurant Description"
                variant="outlined"
                name="restaurantDescription"
                value={formData.restaurantDescription}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Third Row */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                type="tel"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
            </Grid>

            {/* Fourth Row */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Minimum Delivery Amount"
                variant="outlined"
                name="minDeliveryAmount"
                value={formData.minDeliveryAmount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Free Delivery Amount"
                variant="outlined"
                name="freeDeliveryAmount"
                value={formData.freeDeliveryAmount}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Fifth Row */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Delivery Fee"
                variant="outlined"
                name="deliveryFee"
                value={formData.deliveryFee}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Delivery Radius"
                variant="outlined"
                name="deliveryRadius"
                value={formData.deliveryRadius}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Sixth Row - Delivery Times */}
            {/* Assume you have a function that correctly handles time changes */}

            {/* Seventh Row */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Status"
                variant="outlined"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Service Type"
                variant="outlined"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Restaurant
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Editregisterform;
