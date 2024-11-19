import React, { useState,useEffect } from 'react'
import { Box, TextField, Button, Typography, FormLabel } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../Store/Reducers';
const EditBlog = () => {
   
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const id = useParams().id;
    const ID = localStorage.getItem("userid");
    const [input, setInput] = useState({});
    const [blog, setBlog] = useState({});

    const handleChange = (e) => {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const getSingleBlog = async () => {
        // console.log(id);
        try {
            const data = await axios.get(`/api/v1/blog/get-blog/${id}`);
            if(data.data.success){
                console.log(data.data.blog);
                setBlog(data.data.blog);
                setInput({
                  title: data?.data.blog.title,
                  description: data?.data.blog.description,
                  image: data?.data.blog.images,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getSingleBlog();
    }, [id]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
          title: input.title,
          description: input.description,
          image: input.image,
          user: ID,
        });
        if (data?.success) {
          alert("Blog Updated");
          Navigate("/my-blogs");
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(blog);
    
  return (
    <>
      <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "60%",
        margin: "auto",
        marginTop:"4vw",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" sx={{
        color:"black", fontWeight: 'medium', fontFamily: 'Roboto',
      }}>
        Edit-Blog
      </Typography>
      <FormLabel sx={{marginTop:"1vh", fontSize:"1.3rem", fontWeight: 'semibold', color:"black" }}>Title</FormLabel>
      <TextField
        name="title"
        value={input.title}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        required
      />
      <FormLabel sx={{fontSize:"1.3rem", fontWeight: 'semibold', color:"black" }}>Description</FormLabel>
      <TextField
      name="description"
      value={input.description}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
      required
      />
      <FormLabel sx={{ fontSize:"1.3rem", fontWeight: 'semibold', color:"black" }}>Image URL</FormLabel>
      <TextField
         name="image"
         value={input.image}
         onChange={handleChange}
         margin="normal"
         variant="outlined"
         required
      />
      <Button type="submit" variant="contained" color="warning" fullWidth sx={{marginTop:"1vh"}}>
        Create Blog
      </Button>
    </Box>
    </>
  )
}

export default EditBlog;