import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('MONGODB is connected');
    }).catch(e=>{
        console.log(e);
    })


const app=express();
app.use(express.json());
app.listen(3000,()=>{
    console.log('Server is running at http://localhost:3000');
})
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode||500).json({success:false,statusCode,message});
})