import React, { useState } from 'react';
import {
  Typography,  Button,  Grid,  TextField, Container,
  ListItemText, Select, FormControl, MenuItem, InputLabel, Snackbar, Alert
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Sidebar from './sidebar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Restarurentform = () => {

  
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
      Wednesday: { start: null, end: null },
      Thursday: { start: null, end: null },
      Friday: { start: null, end: null },
      Saturday: { start: null, end: null },
      Sunday: { start: null, end: null },
    },
    status: '',
   serviceType: '',
  });


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
      const response = await fetch('http://localhost:5000/api/registerrestaurent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setFormData('')
      setMessage('Restaurent Register successfully!');
        setOpen(true); 
      
    } catch (error) {
      setMessage('Restaurent Register Failed!');
      setOpen(true); 
      console.error('There was an error!', error);
      // Handle error here
    }
  };
  



  const handleServiceTypeChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      serviceType: event.target.value,
    }));
  };



  const handleClose = ()=> {
    setOpen(false);
  }



  return (
    <div>
      <Sidebar />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position Snackbar in the top-right corner
      >
        <Alert onClose={handleClose} severity={message.includes('successfully') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Register New Restaurant
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
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Restaurant Opening Time (Weekly)
              </Typography>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <Grid container key={day} spacing={1} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2">{day}</Typography>
              </Grid>
              <Grid item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Opening Time"
                    value={formData.deliveryTimes[day]?.start || null}
                    onChange={(newValue) => handleTimeChange(day, 'start', newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Closing Time"
                    value={formData.deliveryTimes[day]?.end || null}
                    onChange={(newValue) => handleTimeChange(day, 'end', newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          ))}

            </Grid>

            {/* Sixth Row */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-select-label">Restaurant Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  name="status"
                  value={formData.status}
                  label="Restaurant Status"
                  onChange={handleChange}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                  <MenuItem value="Coming Soon">Coming Soon</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
            <RadioGroup
                row
                aria-label="service-type"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleServiceTypeChange}
              >
                <FormControlLabel value="Delivery" control={<Radio />} label="Delivery" />
                <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
                <FormControlLabel value="Both" control={<Radio />} label="Both" />
              </RadioGroup>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Restarurentform;
