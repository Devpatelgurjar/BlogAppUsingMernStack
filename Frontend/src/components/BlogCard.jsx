import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const BlogCard = ({ title, description, image, username, time, id, isUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function formatTime(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/blog/delete-blog/${id}`
      );
      console.log(response);
      window.location.reload();
      dispatch({ type: "USER_LOGOUT" });
      navigate("/my-blogs");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "90%", md: "80%", lg: "60%" }, // Responsive widths
        margin: "auto",
        mt: 2,
        p: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display="flex" mb={1}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={title}
        subheader={formatTime(time)}
      />
      <CardMedia
        component="img"
        sx={{
          height: { xs: 150, sm: 200, md: 250 }, // Adjust height based on screen size
          objectFit: "cover",
        }}
        image={image}
        alt="Blog Image"
      />
      <CardContent>
        <Typography variant="h6" color="text.primary" gutterBottom>
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
