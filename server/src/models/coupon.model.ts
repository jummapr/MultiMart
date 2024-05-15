require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface ICoupon extends Document {
  name: string;
  value: number;
  minAmount: number;
  maxAmount: number;
  shopId: string;
  selectedProducts: string;
}

const productSchema: Schema<ICoupon> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your coupon name!"],
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
    },
    maxAmount: {
      type: Number,
    },
    shopId: {
      type: String,
      required: true,
    },
    selectedProducts: {
      type: String,
    },
  },
  { timestamps: true }
);

const CouponCode: Model<ICoupon> = mongoose.model("couponCode", productSchema);

export default CouponCode;
