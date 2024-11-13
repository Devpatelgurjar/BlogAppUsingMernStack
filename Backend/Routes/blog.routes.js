const express = require('express');
const {
    CreateBlog,
    GetAllBlog,
    GetBlogById,
    UpdateBlog,
    DeleteBlog,
    userBlog
} = require("../Controllers/Blog.controller");

//router object
const router = express.Router();

//routes
 
// GET || All blogs
router.get("/all-blog", GetAllBlog); //D

// GET || Single blog
router.get("/get-blog/:id", GetBlogById);

// POST || Create blog
router.post("/create-blog", CreateBlog); //D

// PUT || Update blog
router.put("/update-blog/:id", UpdateBlog);

// DELETE || Delete blog
router.delete("/delete-blog/:id", DeleteBlog); //D

//GET || user blog
router.get("/user-blog/:id", userBlog);

module.exports = router;
//modules mat likh module likh and exports hone chahiye na ki export
