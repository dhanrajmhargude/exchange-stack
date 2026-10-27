import type { Request , Response } from "express";
import { sendToEngine } from "../utils/broker";
import { cancelOrderSchema, createOrderSchema } from "../types/order-schema.js";
import { validationError } from "../utils/validation.js";

export async function createOrder(req : Request , res : Response):Promise<void> {
    const parsed = createOrderSchema.safeParse(req.body);
    
    if(!parsed.success){
        validationError(res , parsed.error)
        return;
    }
    try{
        const result = await sendToEngine("create_order",{
            userId : req.userId ,
            ...parsed.data
        });
        res.status(201).json(result);
    }catch(err){
        res.status(502).json({error:(err as Error).message});
    }
    
}

export async function cancelOrder(req : Request , res : Response):Promise<void> {
    const parsed = cancelOrderSchema.safeParse(req.body)

    if(!parsed.success){
        validationError( res , parsed.error)
        return;
    }
    try{
        const result = await sendToEngine("cancel_order",{
            userId :req.userId;
            ...parsed.data
        });
        res.status(201).json(result);
    }catch(err){
        res.status(502).json({error:(err as Error).message});       
    }
}

export async function getOrder(req : Request , res : Response):Promise<void> {
    const {id} = req.params;

    if(!id){
        res.status(400).json({error:"orderId required"});
        return;
    }

    try {
        const result = await sendToEngine("get_order",{
            userId : req.userId,
            orderId : id 
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(502).json({error:(err as Error).message});               
    }
}

