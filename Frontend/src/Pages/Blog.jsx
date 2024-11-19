import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }}
      >
        Blog
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {blogs &&
          blogs.map((blog) => (
            <BlogCard
              title={blog.title}
              isUser={localStorage.getItem("userid") === blog.user._id}
              description={blog.description}
              image={blog.images}
              username={blog.user.username}
              key={blog._id}
              id={blog._id}
              time={blog.createdAt}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Blog;
