import type { Request , Response } from "express";
import { authschema } from "../types/auth-schema.ts";
import { validationError } from "../utils/validation.ts";
import bcrypt from "bcryptjs";
import { prisma } from "../db.ts";
import { createToken } from "../utils/auth.ts";

export async function signup(req : Request , res : Response): Promise<void>{

    const parseBody = authschema.safeParse(req.body);
    
    if(!parseBody.success){
        validationError(res , parseBody.error);
        return;
    }

    const{ username , password} = parseBody.data;
    const hashedPassword = await bcrypt.hash ( password , 10 );

    try {
 
        const user = await prisma.user.create({
            data:{
                username,
                password :hashedPassword,
            }
        })

        res.status(201).json({
            token : createToken({userId : user.id}),
            userID : user.id ,
            username : user.username,
        })

    } catch{
        res.status(500).json({error : "soemthing went wrong!"})
    }   
}

export async function signin(req : Request , res : Response): Promise<void> {

    const parseBody = authschema.safeParse(req.body);

    if(!parseBody.success){
        validationError(res , parseBody.error);
        return;
    }

    const { username , password } = parseBody.data;

    try{
        const user = await prisma.user.findUnique({
            where :{
                username
            },
            select:{
                id: true ,
                username : true ,
                password : true ,
            },
        })

        if(!user){
            res.status(404).json({
                error:"user does not exist ",
            })
            return; 
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        if(!isPasswordCorrect){
            res.status(401).json({
                error:"wrong password please check and retry"
            });
            return;
        }

        res.status(200).json({
            token : createToken({userId: user.id}),
            userId: user.id,
            username : user.username,
        })

    }catch{
        res.status(500).json({
            error:"something went wrong!"
        })
    }
}