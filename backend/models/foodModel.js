import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
});
const foodModel=mongoose.model('meal',foodSchema);
//const foodModel=mongoose.models.meal  mongoose.model('meal',foodSchema);
export default foodModel;