import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required: true 
    },
    title:{
        type: String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:'https://miro.medium.com/v2/resize:fit:720/1*lA8GJcChNMmpvoKHqcVS_w.jpeg'
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    
},{timestamps:true});

const Post=mongoose.model("Post",postSchema);
export default Post;