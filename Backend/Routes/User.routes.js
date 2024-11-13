const express = require("express");

const {
    GetAllUsers,
    RegisterUser,
    Userlogin
} = require("../Controllers/User.controller")

const router = express.Router();

//get all user||Get
router.get("/all-user",GetAllUsers);

//register user||Post
router.post("/register",RegisterUser);

//login||Post
router.post('/login',Userlogin)

module.exports = router;