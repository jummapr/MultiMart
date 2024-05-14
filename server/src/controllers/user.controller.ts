import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import uploadOnCloudinary from "../utils/cloudinary";
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

    const activationToken = createActivationToken(userData);
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

    try {
      await sendMail({
        email: userData.email,
        subject: "Activate your account",
        template: "activation.link.ejs",
        data,
      });
      return res
        .status(201)
        .json(
          new ApiResponse(200, `please check your email:- ${userData.email}`)
        );
    } catch (error) {
      console.log(error);
      throw new ApiError(500, error.message, error);
    }
  }
);

// activation user

interface NewUser {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

export const activateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token } = req.params;

    const newUser = jwt.verify(
      activation_token as string,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    console.log("verify JWT token");

    if (!newUser) {
      throw new ApiError(400, "Invalid token");
    }

    const { name, email, password, avatar } = newUser as NewUser;
    console.log("destructure the data");

    let user = await User.findOne({ email });

    if (user) {
      throw new ApiError(400, "User already exist");
    }

    user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    sendToken(user, 201, res, "user account activated successfully");
  }
);

// Login user

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(400, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }

    sendToken(user, 200, res, "User Login Success");
  }
);

// Load user

export const loadUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(400, "User doesn't exist.");
    }

    res.status(200).json(new ApiResponse(200, "user fetched.", user));
  }
);

// logout the user

export const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Successfully logged out.", null));
  }
);

// create shop

export interface IShopCreate {
  shopName: string;
  description?: string; // Optional since it's not marked as required in the schema
  email: string;
  password: string;
  phoneNumber?: number; // Optional since it's not marked as required in the schema
  address: string;
  zipcode: number;
  avatar?: {
    public_id: string;
    url: string;
  };
}

// create shop

export const createShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const shopData: IShopCreate = req.body;
    const {
      address,
      email,
      shopName,
      password,
      zipcode,
      description,
      phoneNumber,
    } = shopData;

    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const fileName = req.file.filename;
      await uploadOnCloudinary(fileName);

      throw new ApiError(400, "User already exist.");
    }

    const fileName = req.file?.path;
    console.log(fileName);

    const uploadedOnCloudinary = await uploadOnCloudinary(fileName);
    console.log("Cloudinary URl", uploadedOnCloudinary.url);
    const sellerData = {
      shopName,
      description,
      email,
      phoneNumber,
      address,
      zipcode,
      password,
      avatar: {
        public_id: uploadedOnCloudinary?.public_id,
        url: uploadedOnCloudinary?.secure_url,
      },
    };

    console.log(sellerData);

    const activationToken = createActivationTokenForShop(sellerData);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    const data = {
      user: {
        name: sellerData.shopName,
      },
      activationUrl,
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation.link.ejs"),
      data
    );

    try {
      await sendMail({
        email: sellerData.email,
        subject: "Activate your shop",
        template: "activation.link.ejs",
        data,
      });
      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            `Please check your email to verify your shop:- ${sellerData.email}`
          )
        );
    } catch (error) {
      console.log(error);
      throw new ApiError(500, error.message, error);
    }
  }
);

// active shop

export const activateShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token } = req.params;

    const newUser = jwt.verify(
      activation_token as string,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    console.log("verify JWT token");

    if (!newUser) {
      throw new ApiError(400, "Invalid token");
    }

    const {
      address,
      email,
      shopName,
      password,
      zipcode,
      description,
      phoneNumber,
      avatar,
    } = newUser as IShopCreate;
    console.log(avatar);
    console.log("destructure the data");

    let seller = await Shop.findOne({ email });

    if (seller) {
      throw new ApiError(400, "User already exist");
    }

    seller = await Shop.create({
      shopName,
      description,
      email,
      phoneNumber,
      address,
      zipcode,
      password,
      avatar,
    });

    sendShopToken(seller, 201, res, "user shop activated successfully");
  }
);

// Login to shop

export const LoginToShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await Shop.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(400, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }

    sendShopToken(user, 201, res, "user login to shop successfully.");
  }
);

export const loadSellerUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    console.log(req.user);
    const { id } = req.user;
    const user = await Shop.findById(id);

    if (!user) {
      throw new ApiError(400, "Seller doesn't exist.");
    }

    res.status(200).json(new ApiResponse(200, "Seller fetched.", user));
  }
);

// shop logout
export const shopLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Successfully logged out.", null));
  }
);
