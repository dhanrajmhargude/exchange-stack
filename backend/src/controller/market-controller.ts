import type { Request,Response } from "express";
import { sendToEngine } from "../utils/broker";

export async function getDepth(req : Request , res :Response):Promise<void>{
    const market = req.query.market;

    if(typeof market !== "string" || market.length ===0 ){
        res.status(400).json({error:"market query param required!"});
        return;
    }
    try{
        const result = await sendToEngine("get_depth",{market});
        res.status(201).json(result);
    }catch(err){
        res.status(502).json({error:(err as Error).message});
        return;
    }
}