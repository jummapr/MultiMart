require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "./user.model";

export interface IOrder extends Document {
  cart: Array<any>;
  shippingAddress: object;
  user: IUser;
  totalPrice: number;
  status: string;
  paymentInfo: {
    id: string;
    status: string;
    type: string;
  };
  paidAt: Date;
  deliverAt: Date;
  createdAt: Date;
}

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    cart: {
      type: [
        {
          type: Schema.Types.Mixed,
        },
      ],
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    deliverAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const orderModel: Model<IOrder> = mongoose.model("Order", orderSchema);

export default orderModel;
