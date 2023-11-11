import mongoose from "mongoose";

const CommentSchema =new mongoose.Schema({
    comment:{
        type:String,
        required:[true, "comment required"]
    },
    blogId: { 
        type: mongoose.Schema.ObjectId, ref: 'Blog', 
        required: true 
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;