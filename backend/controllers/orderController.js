import OrderModel from "../models/orderModel.js";
import UserModel from './../models/userModel.js';
import Stripe from "stripe";
const STRIPE_SECRET_KEY = "ahmed";
//placing  user order for frontend
const stripe=new Stripe(STRIPE_SECRET_KEY)
const placeOrder=async (req,res)=>{
    try {
        const newOrder=new OrderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData:{}})
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:'usd',
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity,
        }))
        line_items.push({
            price_data:{
                currency:'usd',
                product_data:{
                    name:'Delivary Charges',
                },
                unit_amount:2*100*80
            },
            quantity:1,
        })
        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`http://localhost:5173/verify?sucess=true&orderId=${newOrder_id}`,
            cancel_url:`http://localhost:5173/verify?sucess=false&orderId=${newOrder_id}`,

        })
        res.json({success:true, session_url:session.url})

    } catch (error) {
       console.log(error)
        res.json({success:false, message:"Server in payment Error"}) 
    }
}
const verifyOrder=async (req,res) => {
    //verifying order
    const {sucess,orderId} = req.body;
    try {
        if(sucess=="true"){
            return res.json({success:false, message:"Payment Failed"})
            await OrderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Order payment successful"})
        }else{
            await OrderModel.findByIdAndDelete(orderId);
            return res.json({success:false, message:"Payment Cancelled"})
        }
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:"Server in verify Order Error"})
    }
}
const userOrders=async (req, res) => {
    try {
        const orders=await OrderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:"Server in userOrders Error"})
    }

}
//for administration
const listOrders=async (req, res) => {
    try {
        const orders=await OrderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:"Server in listOrders Error"})
    }
 }

// for updating user status
const updateStatus = async (req, res) => {
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:"Order Status updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:"Server in updateStatus Error"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}