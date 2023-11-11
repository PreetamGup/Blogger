import connectDB from "@/db";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req) {

    try {
        await connectDB()
        let {name, username, password}=await req.json()


        if(!name || !username || !password){
            return NextResponse.json({
                message:"All Data Required",
                success:false
            })
        }

        const userExist = await UserModel.findOne({username});

        if(userExist){
            return NextResponse.json({
                message:"Username already exist",
                success:false
            })
        }

        const salt= await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        password = hashpassword;

        const newUser = new UserModel({name, username, password})
        await newUser.save();
        return NextResponse.json({
            message:"User Register Successfull",
            success:true,
            newUser
        })
        
    } catch (error) {
        return NextResponse.json(error)
    }
    
   
 }