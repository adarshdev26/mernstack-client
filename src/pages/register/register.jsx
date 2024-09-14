import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";


const validationSchema = Yup.object({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


const initialValues = {
  username: '',
  email: '',
  password: '',
};



export function RegistrationForm() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:5000/api/register', values)
      .then(response => {
        setMessage('Registration successful!');
        setOpen(true); 
        setTimeout(()=> {
          navigate('/login')
        },3000)
      })
      .catch(error => {
        setMessage('Registration failed. Please try again.');
        setOpen(true);
      })
      .finally(() => {
        setSubmitting(false); 
      });
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <>
    <Navbar/>
          <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
      >
        <Alert onClose={handleClose} severity={message.includes('successful') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                '& .MuiTextField-root': { m: 2, width: '300px' },
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <Typography variant="h6">Register</Typography>
              
              <Field
                as={TextField}
                name="username"
                label="Name"
                placeholder="Enter your Name"
                required
                helperText={<ErrorMessage name="username" />}
                error={<ErrorMessage name="username" />}
              />
              
              <Field
                as={TextField}
                name="email"
                label="Email"
                placeholder="Enter your Email"
                required
                helperText={<ErrorMessage name="email" />}
                error={<ErrorMessage name="email" />}
              />
              
              <Field
                as={TextField}
                name="password"
                label="Password"
                placeholder="Enter your Password"
                type="password"
                required
                helperText={<ErrorMessage name="password" />}
                error={<ErrorMessage name="password" />}
              />
              
              <Button
                type="submit"
                variant="contained"
                style={{ background: '#f57c00' }}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
