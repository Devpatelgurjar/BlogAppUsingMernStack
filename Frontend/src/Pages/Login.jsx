import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/Reducers";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/login", formData);
      if (!response.data.success) {
        return alert(response.data.message);
      }
      dispatch(login());
      localStorage.setItem("userid", response.data.user._id);
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: { xs: "90%", sm: 400 },
        margin: "auto",
        marginTop: 4,
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
        Login
      </Typography>
      <TextField
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          marginTop: 2,
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
