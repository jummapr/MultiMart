import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import CouponCode from "../models/coupon.model";

export const createCouponCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, value, minAmount, maxAmount, shop } = req.body;

    const isCouponCodeExist = await CouponCode.find({ name });

    if (isCouponCodeExist) {
      throw new ApiError(400, "Coupon code already exist.");
    }

    if (!name || !value || !minAmount || maxAmount || shop) {
      throw new ApiError(400, "All field required.");
    }

    const couponCode = await CouponCode.create({
      name,
      value,
      minAmount,
      maxAmount,
      shop,
    });

    res
      .status(201)
      .json(
        new ApiResponse(200, "Coupon Code created successfully.", couponCode)
      );
  }
);
