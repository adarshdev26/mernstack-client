import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";


const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};



export function LoginForm() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:5000/api/login', values)
      .then(response => {
        setMessage('Login successful!');
        
        setOpen(true); 
        const username = response.data.user.username;
        const role = response.data.user.role;
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('role',role);
        if(role === 'admin') {
        navigate('/dashboard');
        }else {
          navigate('/')
        }
      })
      .catch(error => {
        setMessage('Login failed. Please try again.');
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
          sx={{marginTop:'50px'}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
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
              <Typography variant="h6">Login</Typography>
              
              
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
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
