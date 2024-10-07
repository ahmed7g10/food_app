import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item 

    export const addFood = async (req, res) => {
        let image_filename=`${req.file.filename}`;
        let food=new foodModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: image_filename
        })
        try {
            const result = await food.save();
            res.status(201).json({success:true,result}); 
        } catch (error) {
            console.log(error);
            res.status(400).json({success:false, message: error.message });
        }
    };
//all food list

    export const getFoods = async (req, res) => {
        try {
            const foods = await foodModel.find();
            res.json({success:true,data:foods});
        } catch (error) {
            res.status(400).json({success:false, message: error.message });
        }
    };
//remover food

export const removeFood =async(req, res)=>{
    try {
        const {id}=req.params;
        const forDelImage=await foodModel.findById(id);
        
        await fs.unlink(`uploads/${forDelImage.image}`,(e)=>{
            if (e){
                console.log(e.message)
                return
            }
        })
        const food=await foodModel.findByIdAndDelete(id);
        res.json({success:true,data:food});
    } catch (error) {
        res.json({success:false ,error:error.message});
    }
}