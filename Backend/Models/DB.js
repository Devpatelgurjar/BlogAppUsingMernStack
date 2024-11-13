const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const connectDB = async () => {
    try {
        const db =await mongoose.connect(DB_URL);
        if(db){
            console.log("Connected to MongoDB");
        }
        else{console.log("some error occurs")}
    }catch(err){
        console.log(err.message);
    }

}

connectDB();