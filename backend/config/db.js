import mongoose from "mongoose";
import dotenv from 'dotenv'
import 'dotenv/config'
dotenv.config()
export const connectDB=async()=>{
   await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connect database connection succeeded");
   }).catch((e)=>{
    console.log("Failed to connect database connection",e);
   });
}