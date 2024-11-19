import React, { useState } from "react";
import { Box, TextField, Button, Typography, FormLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/Reducers";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("userid");

  const [input, setInput] = useState({
    title: "",
    description: "",
    images: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const createNewBlog = async () => {
    try {
      const data = await axios.post("/api/v1/blog/create-blog", {
        title: input.title,
        description: input.description,
        images: input.image,
        user: id,
      });
      alert("Blog Created");
      dispatch(login());
      navigate("/my-blogs");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewBlog();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: { xs: "90%", sm: "70%", md: "60%" },
        margin: "auto",
        marginTop: 4,
        padding: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "black",
          fontWeight: "medium",
          fontFamily: "Roboto",
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Create Blog
      </Typography>
      <FormLabel
        sx={{
          marginTop: 1,
          fontSize: { xs: "1rem", sm: "1.3rem" },
          fontWeight: "bold",
          color: "black",
        }}
      >
        Title
      </FormLabel>
      <TextField
        onChange={handleInput}
        name="title"
        label="Title"
        type="text"
        variant="outlined"
        fullWidth
        required
      />
      <FormLabel
        sx={{
          fontSize: { xs: "1rem", sm: "1.3rem" },
          fontWeight: "bold",
          color: "black",
        }}
      >
        Description
      </FormLabel>
      <TextField
        onChange={handleInput}
        name="description"
        label="Description"
        type="text"
        variant="outlined"
        fullWidth
        required
      />
      <FormLabel
        sx={{
          fontSize: { xs: "1rem", sm: "1.3rem" },
          fontWeight: "bold",
          color: "black",
        }}
      >
        Image URL
      </FormLabel>
      <TextField
        onChange={handleInput}
        name="image"
        label="Image URL"
        type="text"
        variant="outlined"
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="warning"
        fullWidth
        sx={{
          marginTop: 1,
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        Create Blog
      </Button>
    </Box>
  );
};

export default CreateBlog;
