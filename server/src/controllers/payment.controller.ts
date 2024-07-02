import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import uploadOnCloudinary, { deleteTheOldPicture } from "../utils/cloudinary";
import {
  createActivationToken,
  createActivationTokenForShop,
} from "../utils/generateActiveationLink";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/sendToken";
import { IGetUserAuthInfoRequest } from "../middlewares/auth.middlewares";
import Shop from "../models/shop.model";
import { sendShopToken } from "../utils/sendShopToken";
import { redis } from "../utils/redis";

import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");


export const createPayment = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {

    const {amount} = req.body;

  const myPayment = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    description: "Payment for product",
    metadata: {
      company: "multiMart"
    }
  });
  
  res.status(201).json({
    success: true,
    client_secret: myPayment.client_secret
  })
});


export const getApiKey = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
    success: true,
    apiKey: process.env.STRIPE_API_KEY
  })
})