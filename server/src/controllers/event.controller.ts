import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import uploadOnCloudinary, { deleteTheOldPicture } from "../utils/cloudinary";
import Event from "../models/event.model";
import Shop from "../models/shop.model";

export const createEvent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      category,
      start_date,
      finish_date,
      status,
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
    // console.log("Files", files);

    if (!files || files.length === 0) {
      throw new ApiError(400, "No image found.");
    }

    const uploadPromises = files.map((file: any) =>
      uploadOnCloudinary(file.path)
    );

    const uploadResults = await Promise.all(uploadPromises);

    const images = uploadResults.map((result) => ({
      public_id: result?.public_id,
      url: result?.secure_url,
    }));

    const productData = {
      name,
      description,
      category,
      start_date,
      finish_date,
      status,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId,
      shop,
    };

    const event = await Event.create(productData);

    res
      .status(201)
      .json(new ApiResponse(200, "Event created successfully.", event));
  }
);

// get all events

export const getAllEventsFromShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const shopId = req.params.shopId;

    if (!shopId) {
      throw new ApiError(400, "Shop ID is required.");
    }

    const event = await Event.find({ shopId });

    if (!event) {
      throw new ApiError(
        404,
        "Event not found. Please ensure the Shop ID is correct."
      );
    }

    res
      .status(201)
      .json(new ApiResponse(200, "Event fetched successfully.", event));
  }
);

// delete event

export const deleteEvent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    if (!eventId) {
      throw new ApiError(400, "Event ID is required.");
    }

    const event = await Event.findById({ _id: eventId });

    if (!event) {
      throw new ApiError(404, "Event not found.");
    }

    if (event.images && event.images.length > 0) {
      event.images.map(async (item) => {
        const deletedImages = await deleteTheOldPicture(item.public_id);
        console.log("Files Deleted", deletedImages);
      });
    }

    await event.deleteOne();

    res
      .status(200)
      .json(new ApiResponse(200, "Event deleted successfully.", event));
  }
);


// get all events
export const getAllEvents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const events = await Event.find();

    if (!events) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    res
      .status(201)
      .json(new ApiResponse(200, "Event fetched successfully.", events));
  }
)