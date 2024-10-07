import express from 'express';
import { addFood, getFoods, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter=express.Router();
 
//image storage engine
const storage=multer.diskStorage({
    destination:import.meta.env.MODE === "development" 
    ? "uploads" 
    : "backend/uploads",
    filename:(req, file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});
const upload=multer({storage:storage})
foodRouter.post('/add',upload.single('image'),addFood);
foodRouter.get('/list',getFoods)
foodRouter.delete('/:id',removeFood);

export default foodRouter;
