const userModel = require("../Models/User.model");
const bcrypt = require("bcrypt")

exports.RegisterUser = async(req,res)=>{
    try {
        const { username, email, password, blog } = req.body;
    
        //validation
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success:false,
                message: "Please enter all fields" });
        };
        
        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"User is already exist"
            })
        };

        //hassing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //registring new user
        const newUser = new userModel({username, email, password:hashedPassword,blog});
        await newUser.save();
        return res.status(201).json({
            success:true,
            message:"user is created",
            newUser
        })
     
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error fetching response",
            error
        })
    }
}

exports.GetAllUsers =async(req,res)=>{
    try {
        const users = await userModel.find({});
        return res.status(201).send({
            userCount: users.length,
            success:true,
            message:"all users fetched",
            users
        })
    } catch (error) { 
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error fetching users",
        })
    }
}

exports.Userlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(401).send({
          success: false,
          message: "Please provide email or password",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(200).send({
          success: false,
          message: "email is not registerd",
        });
      }
      //password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({
          success: false,
          message: "Invlid username or password",
        });
      }
      return res.status(200).send({
        success: true,
        messgae: "login successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Login Callcback",
        error,
      });
    }
  };
 