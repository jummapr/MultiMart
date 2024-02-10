import { NextFunction, Request, Response } from "express"


const asyncHandler = (handler: any) => async(req:Request,res:Response,next:NextFunction) => {
    try {
        await handler(req,res,next)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:  error.message || "internal server error"
        })
    }
}

export default asyncHandler;