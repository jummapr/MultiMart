import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import uploadOnCloudinary, { deleteTheOldPicture } from "../utils/cloudinary";
import ejs from "ejs";
import path from "path";
import Product from "../models/product.model";
import Shop from "../models/shop.model";
import Comment from "../models/comment.model";
import orderModel from "../models/order.model";

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
    const product = await Product.find();

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

    const product = await Product.findById({ _id: ProductId });

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    if (product.images && product.images.length > 0) {
      product.images.map(async (item) => {
        const deletedImages = await deleteTheOldPicture(item.public_id);
        console.log("Files Deleted", deletedImages);
      });
    }

    await product.deleteOne();

    res
      .status(200)
      .json(new ApiResponse(200, "Product deleted successfully.", product));
  }
);

// get all product from shop
export const getAllProductFromShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ProductId = req.params.id;
    if (!ProductId) {
      throw new ApiError(400, "Product ID is required.");
    }

    const product = await Product.find({ shopId: ProductId });

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    res.status(200).json(new ApiResponse(200, "", product));
  }
);

// get all product

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find().sort({ createdAt: -1 });

    if (!products) {
      throw new ApiError(404, "Products not found.");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Products fetched successfully!", products));
  }
);

// get shop info

export const getShopInfo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const shopId = req.params.id;

    if (!shopId) {
      throw new ApiError(400, "Shop Id is required.");
    }

    const shop = await Shop.findById({ _id: shopId });

    if (!shop) {
      throw new ApiError(404, "Shop not found.");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Shop Info fetched successfully!", shop));
  }
);

// get product detail by id

export const getProductById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ProductId = req.params.id;

    if (!ProductId) {
      throw new ApiError(400, "Product Id is required.");
    }

    const product = await Product.findById({ _id: ProductId });

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Product fetched successfully!", product));
  }
);

// create reviews for products

// TODO: if user already give that reviews then review button shoud not appear
// TODO: user review is pending.
export const createReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, productId, ratting, comment, orderId } = req.body;

    // get reviews then check if user already reviewed that product or not if yes then update else create
    const product = await Product.findById(productId);

    const review = {
      user,
      ratting,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find((rev) => rev.user._id === user._id);

    if (isReviewed) {
      product.reviews.forEach((rev: any) => {
        if (rev.user._id === user._id) {
          (rev.ratting = ratting), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.ratting;
    });

    product.rattings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(201).json(new ApiResponse(201, "Reviewed successfully!", {}));
  }
);


