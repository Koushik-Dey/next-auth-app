import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"


connect()

export async function POST(request: NextRequest) {
    try {
       const req =  await request.json()
        const { username, email, password } = req
        console.log(req)

        //check if user already exists
       const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password , salt)

       const newUser = new User({
            username,
            email,
            password:hashedpassword
       })
        
       const savedUser =  await newUser.save()

        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfullyt",
            success: true,
            savedUser
        })
        

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}