import connectDB from "@/db";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req) {

    try {
        await connectDB()
        let {username, password}=await req.json()


        if(!username || !password){
            return NextResponse.json({
                message:"All Data Required",
                success:false
            })
        }

        const user = await UserModel.findOne({username});

        if(!user){
            return NextResponse.json({
                message:"No user found",
                success:false
            })
        }

        const result= await bcrypt.compare(password, user.password);
        
        if(!result){
            return NextResponse.json({
                message:"Invalid Credential",
                success:false
            })
        }

        return NextResponse.json({
            message:"Login Successfull",
            success:true,
            user:user.name
        })
        
    } catch (error) {
        return NextResponse.json(error)
    }
    
   
 }