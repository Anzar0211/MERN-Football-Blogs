import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log("Verify User Middleware",req.cookies);
    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(401,"Unauthorized"));
        req.user=user;
        console.log("Line",req.user);
        next();
    })
    
}