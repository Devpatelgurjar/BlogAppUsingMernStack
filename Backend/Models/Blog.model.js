const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is needed"]      
    },
    description:{
        type:String,
        required:[true,"description is needed"], 
    },
    images:{
        type:String,
        required:[true,"images is needed"],
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        require: [true, "user id is required"],
    }
},{ timestamps: true });

const BlogModel = mongoose.model("blog",BlogSchema);

module.exports = BlogModel; //modules mat likh module likh and exports hone chahiye na ki export