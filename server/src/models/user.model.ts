require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role?: string;
  isVerified?: boolean;
  phoneNumber?: Number;
  address?: [
    {
      country: string;
      city: string;
      address1: string;
      address2: string;
      zipCode: number;
      addresstype: string;
    }
  ];
  resetPasswordToken?: string;
  resetPasswordTime?: string;
  comparePassword: (password: string) => Promise<boolean>;
  getJwtToken: () => void;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false,
    },
    phoneNumber: {
      type: Number,
    },
    address: [
      {
        country: {
          type: String,
        },
        state: {
          type: String
        },
        city: {         
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        zipCode: {
          type: Number,
        },
        addressType: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      default: "user",
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

// Hash Password

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModal: Model<IUser> = mongoose.model("User", userSchema);

export default userModal;
