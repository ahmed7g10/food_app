import { response } from 'express';
import UserModel from './../models/userModel.js';
import foodModel from '../models/foodModel.js';
//add to Cart
const addToCart =async (req,res) =>{
    try {
        // if(!req.body.itemId){
        //     return res.json({success:false, message:"itemId is required"})
        // }
        // const exists=await foodModel.findOne({_id:itemId});
        // if(!exists){
        //     return res.json({success:false, message:"Item not found"})
        // }
        const userData=await UserModel.findById(req.body.userId)
        const cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] =1
        } 
        else{
            cartData[req.body.itemId]+=1
        }
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true,message:"ADDED TO Cart"})
    } catch (error) {
        res.json({success:false, message:error.message});
        console.log(error);
    }
}

//remove
const removeFromCart =async(req,res) =>{
   try {
    const userData=await UserModel.findById(req.body.userId)
    const cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId]-=1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, {cartData});
    return res.json({success:true, message:"REMOVED FROM Cart"});

   } catch (error) {
    console.log(error);
    return res.json({success:false, message:"ERROR FROM Cart"}) ;
   }
}

//fetch user cart data

const getCart =async (req,res) =>{
    try {
        const userData=await UserModel.findById(req.body.userId)
        const cartData = await userData.cartData;
        return res.json({success: true, cartData: cartData})

    } catch (error) {
        console.error(error);
        return res.json({success: false, message: "ERROR fetching Cart"})  ;
    }
}

export {getCart, removeFromCart,addToCart}