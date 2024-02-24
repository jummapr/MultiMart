import { Response } from "express";
import { IUser } from "../models/user.model";
import ApiResponse from "./ApiResponse";

interface User {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const token = user.getJwtToken();

  // Options for cookies
  const option = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true,
    // sameSite: 'None'
  };

  res.status(statusCode).cookie("token",token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }).json(new ApiResponse(200,"user account activated successfully",{user,token}))
};

