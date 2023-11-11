import { NextResponse } from "next/server"
import CommentModel from "@/model/CommentModel"
import connectDB from "@/db"


export async function GET( ) {
    

   return NextResponse.json({message:"comment folder Api"})
  }

