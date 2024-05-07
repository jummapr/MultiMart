import { IUser } from "../models/user.model"
import jwt from "jsonwebtoken";

interface User  {
    name: string,
    email:string,
    password: string,
    avatar: {
        public_id: string,
        url: string
    }
}
interface ShopUser  {
    shopName: string,
    email:string,
    password: string,
    avatar: {
        public_id: string,
        url: string
    }
}
export const createActivationToken = (user:User) => {
    const activationToken  = jwt.sign(user,process.env.ACTIVATION_TOKEN_SECRET,{
        expiresIn: "5m",
    });

    return activationToken
}
export const createActivationTokenForShop = (user:ShopUser) => {
    const activationToken  = jwt.sign(user,process.env.ACTIVATION_TOKEN_SECRET,{
        expiresIn: "5m",
    });

    return activationToken
}