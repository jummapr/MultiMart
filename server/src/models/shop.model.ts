require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IShop extends Document {
  shopName: string;
  description?: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role?: string;
  isVerified?: boolean;
  phoneNumber?: Number;
  address?: string;
  zipcode: number;
  resetPasswordToken?: string;
  resetPasswordTime?: string;
  comparePassword: (password: string) => Promise<boolean>;
  getJwtToken: () => void;
}

const shopSchema: Schema<IShop> = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: [true, "Please enter your shop name"],
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "seller",
    },
    zipcode: {
      type: Number,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Hash password
shopSchema.pre<IShop>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password

shopSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Shop: Model<IShop> = mongoose.model("Shop", shopSchema);

export default Shop;
