import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/Reducers";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  let isLogin = useSelector((state) => state.loginUser.isLogin);
  isLogin = isLogin || localStorage.getItem("userid");

  const handleLogout = () => {
    localStorage.removeItem("userid");
    dispatch(logout());
    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "secondary.main" }}>
      <Toolbar>
        {/* Title Section */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          MyBlogAPP
        </Typography>

        {/* Hamburger Menu for Mobile */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            edge="end"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ zIndex: 1300 }} // Ensure the menu is above other content
          >
            {isLogin && (
              <>
                <MenuItem onClick={() => { navigate("/blogs"); handleMenuClose(); }}>Blogs</MenuItem>
                <MenuItem onClick={() => { navigate("/my-blogs"); handleMenuClose(); }}>My Blogs</MenuItem>
                <MenuItem onClick={() => { navigate("/create-blog"); handleMenuClose(); }}>Create Blog</MenuItem>
              </>
            )}
            {!isLogin ? (
              <>
                <MenuItem onClick={() => { navigate("/login"); handleMenuClose(); }}>Login</MenuItem>
                <MenuItem onClick={() => { navigate("/register"); handleMenuClose(); }}>Register</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            )}
          </Menu>
        </Box>

        {/* Navigation Tabs for Larger Screens */}
        {isLogin && (
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Hide on smaller screens
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              indicatorColor="primary"
            >
              <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
              <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
              <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
            </Tabs>
          </Box>
        )}

        {/* Authentication Buttons */}
        <Box sx={{ marginLeft: "auto", display: "flex" }}>
          {!isLogin && (
            <>
              <Button
                sx={{
                  margin: 1,
                  color: "white",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
                LinkComponent={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{
                  margin: 1,
                  color: "white",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
                LinkComponent={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
          {isLogin && (
            <Button
              onClick={handleLogout}
              sx={{
                margin: 1,
                color: "white",
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
