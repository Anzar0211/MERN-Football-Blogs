import User  from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
export const signup=async(req,res,next)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        // return res.status(400).json({message:"please fill all fields"})
        next(errorHandler(400,'All fields are required'))
    }
    const hashedPass=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPass});
    try {
        await newUser.save();
        res.json("Signup successful");
    } catch (error) {
        next(error);
        
    }
    
}