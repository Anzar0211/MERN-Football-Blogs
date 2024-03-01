import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import cookieParser from  'cookie-parser';
import path from 'path';
dotenv.config();
mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('MONGODB is connected');
    }).catch(e=>{
        console.log(e);
    })
const __dirname=path.resolve();

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors({origin:true}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.listen(3000,()=>{
    console.log('Server is running at http://localhost:3000');
})
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client', 'dist','index.html'));
})
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode||500).json({success:false,statusCode,message});
})