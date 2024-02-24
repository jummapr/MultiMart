import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import uploadOnCloudinary from "../utils/cloudinary";
import { createActivationToken } from "../utils/generateActiveationLink";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import jwt from "jsonwebtoken"
import { sendToken } from "../utils/sendToken";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data from req.body or from client
    // Validation - check if empty
    // check if the user already exist or not.
    // get the file

    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // check if the user exists
    const user = await User.findOne({ email });

    if (user) {
      throw new ApiError(400, "User already exists");
    }

    const fileName = req.file?.path;

    const uploadedOnCloudinary = await uploadOnCloudinary(fileName);

    const userData = {
      name,
      email,
      password,
      avatar: {
        public_id: uploadedOnCloudinary?.public_id,
        url: uploadedOnCloudinary?.secure_url,
      },
    };
    console.log("run code 1")

    const activationToken = createActivationToken(userData);
    console.log("Created Activaion Token");
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    const data = {
      user: {
        name: userData.name,
      },
      activationUrl,
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation.link.ejs"),
      data
    );
    console.log("will sent to the email");

    try {
      console.log("will sent to the email 2");

      await sendMail({
        email: userData.email,
        subject: "Activate your account",
        template: "activation.link.ejs",
        data,
      });
      return res
      .status(201)
      .json(new ApiResponse(200, `please check your email:- ${userData.email}`));
    } catch (error) {
      console.log(error);
      throw new ApiError(500, error.message, error);
    }
  }
);


// activation user

interface NewUser {
    name: string,
    email:string,
    password: string,
    avatar: {
        public_id: string,
        url: string
    }
}

export const activateUser  = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const {activation_token} = req.params;

    const newUser = jwt.verify(activation_token as string, process.env.ACTIVATION_TOKEN_SECRET);
    console.log("verify JWT token")

    if(!newUser) {
        throw new ApiError(400,"Invalid token")
    }

    const {name,email, password,avatar} =newUser as NewUser;
    console.log("destructure the data")

    let user = await User.findOne({email});
    console.log("find the users")


    if(user) {
        throw new ApiError(400,"User already exist")
    }

     const newUserCreated = await User.create({
        name,
        email,
        password,
        avatar
    });
    console.log("create user")

    sendToken(newUserCreated,201,res)
})
