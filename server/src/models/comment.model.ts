require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IComment extends Document {
  productId: any;
  user: {
    _id: any;
    name: string;
    email: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
  }
  ratting: number;
  comment: string;
}

const commentSchema: Schema<IComment> = new mongoose.Schema(
  {
    
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
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
        role: {
            type: String,
            required: true,
        },
    },
    ratting: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment: Model<IComment> = mongoose.model("Comment", commentSchema);

export default Comment;
