const express = require("express");
const app = express();  
const cors = require('cors');
const morgan = require("morgan");
const userRoutes = require("./Routes/User.routes");
const blogRouter = require("./Routes/blog.routes");
require('dotenv').config();
require("./Models/DB")
const PORT = process.env.PORT||4000;

//middlewares 
app.use(express.json());
app.use(cors());  
app.use(morgan("dev"));
 
//routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog" ,blogRouter);

app.get('/',(req,res)=>{
    res.send("<h1>Server in running properly</h1>")
}) 

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})