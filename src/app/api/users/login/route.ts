import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

export async function POST(request:NextRequest) {
    try {
        
        const req = await request.json()
        const {email,password} = req
        console.log(req);

        //check if user exists
      const user = await  User.findOne({email})

        if (!user) {
            return NextResponse.json({error:"User does not exists"} , {status:400})
        }
        
        //check if password is correct
        const validPassword = await bcrypt.compare(password , user.password)

        if (!validPassword) {
            return NextResponse.json({error:"Invalid password"} , {status:400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        
        const res = NextResponse.json({
            message: "Login successful",
            success:true,
        })

        res.cookies.set("token", token, {
            httpOnly:true,
        })

        return res

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}