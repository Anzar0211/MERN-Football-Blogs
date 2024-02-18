import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('MONGODB is connected');
    }).catch(e=>{
        console.log(e);
    })


const app=express();
app.listen(3000,()=>{
    console.log('Server is running at http://localhost:3000');
})