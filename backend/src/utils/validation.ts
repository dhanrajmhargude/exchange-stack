import type { Response } from "express";
import type { ZodError } from "zod";

export function validationError( res : Response , err : ZodError): void { // :void is just used for response and doesnt return anything
   
    res.status(400).json({
        error :"Validation error",
        issues: err.issues.map((issue)=>({
            path: issue.path,
            message :issue.message 
        })),
    });

}