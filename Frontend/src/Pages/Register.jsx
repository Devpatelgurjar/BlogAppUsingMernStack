import { Box, TextField, Button, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);  // Error state to display error message if registration fails

  const register = async () => {
    try {
      const user = await axios.post("/api/v1/user/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      Navigate("/login");
      console.log(user);
    } catch (error) {
      console.log(error);
      setError("Registration failed. Please try again.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    register();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 300,
        margin: "auto",
        marginTop: "4vw",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center">
        Sign Up
      </Typography>
      {error && (
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      )}
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        required
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: "1vh" }}
      >
        Submit
      </Button>
      <Link to="/login">
        <Button
          type="button"
          color="primary"
          fullWidth
          sx={{
            textTransform: "lowercase",
            fontSize: "2vh",
            marginTop: "1vh",
          }}
        >
          already have an account? Login
        </Button>
      </Link>
    </Box>
  );
};

export default Register;
