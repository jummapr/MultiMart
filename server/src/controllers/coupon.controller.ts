import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import CouponCode from "../models/coupon.model";

// create coupon code

export const createCouponCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, value, minAmount, maxAmount, shopId, selectedProducts } =
      req.body;

    const isCouponCodeExist = await CouponCode.find({ name });

    if (!isCouponCodeExist) {
      throw new ApiError(400, "Coupon code already exist.");
    }

    if (!name || !value || !shopId) {
      throw new ApiError(400, "All field required.");
    }

    const couponCode = await CouponCode.create({
      name,
      value,
      minAmount,
      maxAmount,
      shopId,
      selectedProducts,
    });

    res
      .status(201)
      .json(
        new ApiResponse(200, "Coupon Code created successfully.", couponCode)
      );
  }
);

// get all coupon
export const getCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const shopId = req.params.shopId;

    if (!shopId) {
      throw new ApiError(400, "Shop ID is required.");
    }

    const coupon = await CouponCode.find({ shopId });

    if (!coupon) {
      throw new ApiError(
        404,
        "Coupon not found. Please ensure the Shop ID is correct."
      );
    }

    res
      .status(201)
      .json(new ApiResponse(200, "coupon fetched successfully.", coupon));
  }
);

// Delete coupon Code
export const deleteCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
      throw new ApiError(400, "Coupon is required.");
    }

    const coupon = await CouponCode.findByIdAndDelete({ _id: id });

    if (!coupon) {
      throw new ApiError(
        404,
        "Coupon not found. Please ensure the coupon Id is correct."
      );
    }

    res
      .status(201)
      .json(new ApiResponse(200, "coupon deleted successfully.", coupon));
  }
);

// get coupon code value by it's name
export const getCouponByName = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.name;

    if (!name) {
      throw new ApiError(400, "Name is required.");
    }

    const coupon = await CouponCode.find({ name });

    if (!coupon) {
      throw new ApiError(
        404,
        "Coupon not found. Please ensure the coupon name is correct."
      );
    }

    res
      .status(201)
      .json(new ApiResponse(200, "coupon deleted successfully.", coupon));
  }
);
