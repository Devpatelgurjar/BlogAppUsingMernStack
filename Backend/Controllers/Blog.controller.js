const mongoose = require("mongoose");
const BlogModel = require("../Models/Blog.model");
const userModel = require("../Models/User.model")

exports.GetAllBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find({});
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "Blogs not found",
            });
        }
        return res.status(200).send({
            success: true,
            message: "Blog list",
            data: blogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error Occurred in fetching",
            success: false,
            error,
        });
    }
};

exports.CreateBlog = async (req, res) => {
    try {
      const { title, description, images, user} = req.body;
      //validation
      if (!title || !description || !images || !user) {
        return res.status(400).send({
          success: false,
          message: "Please Provide ALl Fields",
        });
      }
      const exisitingUser = await userModel.findById(user);
      //validaton
      if (!exisitingUser) {
        return res.status(404).send({
          success: false,
          message: "unable to find user",
        });
      }
  
      const newBlog = new BlogModel({ title, description, images, user });
      const session = await mongoose.startSession(); // use await here as jabtak session nahi banega tabtak kuch nahi hoga
      await session.startTransaction();
      await newBlog.save({session})
      exisitingUser.blog.push(newBlog);
      await exisitingUser.save({session});
      await session.commitTransaction();
      await newBlog.save();
      return res.status(201).send({
        success: true,
        message: "Blog Created!",
        newBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Creting blog",
        error,
      });
    }
  };

exports.GetBlogById = async (req, res) => {
   try {
      const {id} = req.params;
      const blog = await BlogModel.findById(id);
      if (!blog) {
        return res.status(404).send({
            success:false,
            message: "Blog not found",
        });
      };
      return res.status(201).send({
        success:true,
        message:"blog found",
        blog
      })
   } catch (error) {
    console.log(error);
    return res.status(500).send({
        success:true,
        message:"error in deleting the blog",
        error            
    })
   }
};

exports.UpdateBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const body = await req.body;
        const blog = await BlogModel.findByIdAndUpdate(id, body, {new: true});
        if(!blog){
            return res.status(400).send({
                success:false,
                message:"blog not updated"
            });
        };
        return res.status(200).send({
            success:true,
            message:"blog is updated successfully",
            blog
        })
        
    } catch (error) {
        console.error();
        return res.status(500).send({
            success:false,
            message:"error in updating the blog",
            error            
        });
    }
};

exports.DeleteBlog = async (req, res) => {
    try {
        const{id} = await req.params;
        const isDeleted = await BlogModel.findByIdAndDelete(id).populate("user");
        await isDeleted.user.blog.pull(isDeleted);
        if (!isDeleted) {
          return res.status(404).send({
            success:false,
            message:"blog not deleted",
          }); 
        }
        return res.status(201).send({
            success: true,
            message:"blog deleted succssfully"
          })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in deleting the blog",
            error            
        })
    }
};

//GET USER BLOG
exports.userBlog = async (req, res) => {
    try {
      const userBlog = await userModel.findById(req.params.id).populate("blog");
  
      if (!userBlog) {
        return res.status(404).send({
          success: false,
          message: "blogs not found with this id",
        });
      }
      return res.status(200).send({
        success: true,
        message: "user blogs",
        userBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "error in user blog",
        error,
      });
    }
  };
