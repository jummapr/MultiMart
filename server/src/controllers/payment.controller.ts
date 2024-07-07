import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");


export const createPayment = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {

    const {amount} = req.body;

    console.log(typeof amount)

  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    description: "Payment for product",
    // TODO: Set Dynamic address and user  
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    metadata: {
      company: "multimart"
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