require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IEvent extends Document {
  name: string;
  description: string;
  category: string;
  start_date: string;
  finish_date: string;
  status: string;
  tags: string;
  originalPrice?: number;
  discountPrice: number;
  stock: number;
  images: [
    {
      public_id: string;
      url: string;
    }
  ];
  shopId: string;
  shop: object;
  sold_out: number;
}

const eventSchema: Schema<IEvent> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your event product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter your event product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter your event product category name!"],
    },
    start_date: {
      type: String,
      required: true,
    },
    finish_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Running",
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
      required: false,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter your event product discount price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your event product stock!"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    shopId: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Event: Model<IEvent> = mongoose.model("event", eventSchema);

export default Event;
