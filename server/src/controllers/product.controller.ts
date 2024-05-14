import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import uploadOnCloudinary from "../utils/cloudinary";
import ejs from "ejs";
import path from "path";
import Product from "../models/product.model";
import Shop from "../models/shop.model";

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
    } = req.body;

    const shopId = req.body.shopId;

    if (!shopId) {
      throw new ApiError(400, "Shop ID is required.");
    }

    const shop = await Shop.findById(shopId);

    if (!shop) {
      throw new ApiError(
        404,
        "Shop not found. Please ensure the Shop ID is correct."
      );
    }

    const files: any = req.files;
    console.log("Files", files);

    if (!files || files.length === 0) {
      return res.status(400).send("No images provided.");
    }

    const uploadPromises = files.map((file: any) =>
      uploadOnCloudinary(file.path)
    );

    const uploadResults = await Promise.all(uploadPromises);

    const images = uploadResults.map((result) => ({
      public_id: result?.public_id,
      url: result?.secure_url, // or result.url depending on your preference
    }));

    const productData = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId,
      shop,
    };

    const product = await Product.create(productData);

    res
      .status(201)
      .json(new ApiResponse(200, "Product created successfully.", product));
  }
);

// get all product from shop

export const getAllProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const shopId = req.params.shopId;

    if (!shopId) {
      throw new ApiError(400, "Shop ID is required.");
    }

    const product = await Product.find({ shopId });

    if (!product) {
      throw new ApiError(
        404,
        "product not found. Please ensure the Shop ID is correct."
      );
    }

    res
      .status(201)
      .json(new ApiResponse(200, "Product fetched successfully.", product));
  }
);

// delete product
export const deleteProductProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ProductId = req.params.id;
    if (!ProductId) {
      throw new ApiError(400, "Product ID is required.");
    }

    const product = await Product.findByIdAndDelete({ _id: ProductId });

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Product deleted successfully.", product));
  }
);
