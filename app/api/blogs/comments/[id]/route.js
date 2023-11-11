import { NextResponse } from "next/server"
import CommentModel from "@/model/CommentModel"
import connectDB from "@/db";
import BlogModel from "@/model/BlogModel"


export async function GET(req,{ params } ) {
   
    try {
        const {id}= params;
        await connectDB();

        const allComment = await CommentModel.find({blogId:id});
        const Blog = await BlogModel.findById(id)
        return NextResponse.json({
            message:"All comment fetched",
            success:true,
            Blog,
            allComment
        })


    } catch (error) {
        
        return NextResponse.json({
            message:error.message,
            success:false
        })
    }

  }


  export async function POST(req, {params}){
   
    try {
       await connectDB();
      
 
       const {comment}= await req.json();
       const newComment = new CommentModel({comment, blogId:params.id})
       
       await newComment.save();
 
       return NextResponse.json({
          message:"Comment added",
          success:true
       })
 
 
    } catch (error) {
       return NextResponse.json({
          message:error.message,
          success:false
       })
    }
 
 }