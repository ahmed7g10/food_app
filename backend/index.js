import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import path from 'path'
//app config
const app=express();
const PORT=process.env.PORT

//middleware

app.use(express.json());
app.use(cors());

// Db configuration
connectDB()

//api endpoint
app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/images',express.static("uploads"))
// app.get('/', (req, res) => {
//     res.send("Welcome to food")
// })
if (process.env.NODE_ENV === "production") {
	const __dirname=path.resolve();

	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.listen(PORT,()=>{
  console.log(`Server food running on PORT ${PORT}`)
})
