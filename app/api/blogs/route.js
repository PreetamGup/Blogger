import { NextResponse } from "next/server"
import BlogModel from "@/model/BlogModel"
import connectDB from "@/db"

 export async function  GET() {

    try {
     await connectDB();

     const allBlog = await BlogModel.find({});

     return NextResponse.json({
        message:"all blog fetched",
        success:true,
        allBlog
     })

    } catch (error) {
        return NextResponse.json({
            message:error.message,
            success:false
        })
    }
  
}

export async function POST(req) {

    try {
       await connectDB();
        const {title, content, description ,createdBy} = await req.json();

        const newBlog = new BlogModel({title, content, description, createdBy});
        await newBlog.save();

      return  NextResponse.json({
            message:"Blog Added",
            success:true
        })
        
    } catch (error) {
        
      return  NextResponse.json({
            message:error,
            success:false
        })
    }
  
}

