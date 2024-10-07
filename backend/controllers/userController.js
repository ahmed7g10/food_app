import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login 
const LoginUser=async (req, res)=>{
   const {email,password} = req.body;
   try {
    const user=await UserModel.findOne({email: email});
    if(!user){
        return res.json({success:false, message:"wrong email or password"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({success:false, message:"wrong email or password"});
    }
    const token=await createToken(user._id)
    return res.json({success:true,token,login:"successfully loged in" ,message:user});
   } catch (error) {
    console.log(error);
    res.json({success:false, message:"Server Error"})
   }

}

//register
// create token using jwt token
const createToken = async(id)=>{
    //process.env.MYKEY
    return await jwt.sign({id},"ahmed",{expiresIn:'5 days'})
}
const registerUser = async(req, res)=>{
    const {name,password,email} =req.body;

    try {
       const exists=await UserModel.findOne({email: email});
       if(exists){
           return res.json({success:false, message:"User already registered"});
       }
       if(!validator.isEmail(email)){
            return res.json({success:false, message:"Invalid email"});
       }
       if(password.length<8){
            return res.json({success:false, message:"Password is weak "});
       }
       // hashing password
       const salt=await bcrypt.genSalt(10);
       const hashPassword=await bcrypt.hash(password, salt);
       const newUser=new UserModel({
        name,
        email,
        password:hashPassword
       })
      const user= await newUser.save();
      const token=await createToken(user._id)
       return res.json({success:true,token ,message:newUser});
    } catch (error) {
        console.error(error);
        res.json({success:false, message:"Server Error"})
    }
}


export {registerUser, LoginUser}