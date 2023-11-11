import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Add blog Title"]
    },
    description:{
        type:String,
        required:[true, "Add blog description"]
    },
    content:{
        type:String,
        required:[true, "Add blog content"]
    },
    createdBy:{
        type:String,
        required:[true, "Blog creator name requrired"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})



const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;