import asyncHandler from "../utils/asyncHandler";
import User, { IUser } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends Request{
    user: IUser
}

export const isAuthenticated = asyncHandler(
    async (req: IGetUserAuthInfoRequest,res:Response,next:NextFunction) => {
        const {token} = req.cookies;

        if(!token){
            throw new ApiError(400,"Please login first then you can continue.")
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload
        console.log(decoded,"Decoded Data Log")


        req.user = await User.findById(decoded.id)

        next()
    }
)
