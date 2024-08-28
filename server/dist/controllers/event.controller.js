"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvents = exports.deleteEvent = exports.getAllEventsFromShop = exports.createEvent = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = __importStar(require("../utils/cloudinary"));
const event_model_1 = __importDefault(require("../models/event.model"));
const shop_model_1 = __importDefault(require("../models/shop.model"));
exports.createEvent = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name, description, category, start_date, finish_date, status, tags, originalPrice, discountPrice, stock, } = req.body;
    const shopId = req.body.shopId;
    if (!shopId) {
        throw new ApiError_1.default(400, "Shop ID is required.");
    }
    const shop = await shop_model_1.default.findById(shopId);
    if (!shop) {
        throw new ApiError_1.default(404, "Shop not found. Please ensure the Shop ID is correct.");
    }
    const files = req.files;
    // console.log("Files", files);
    if (!files || files.length === 0) {
        throw new ApiError_1.default(400, "No image found.");
    }
    const uploadPromises = files.map((file) => (0, cloudinary_1.default)(file.path));
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
    const event = await event_model_1.default.create(productData);
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Event created successfully.", event));
});
// get all events
exports.getAllEventsFromShop = (0, asyncHandler_1.default)(async (req, res, next) => {
    const shopId = req.params.shopId;
    if (!shopId) {
        throw new ApiError_1.default(400, "Shop ID is required.");
    }
    const event = await event_model_1.default.find({ shopId });
    if (!event) {
        throw new ApiError_1.default(404, "Event not found. Please ensure the Shop ID is correct.");
    }
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Event fetched successfully.", event));
});
// delete event
exports.deleteEvent = (0, asyncHandler_1.default)(async (req, res, next) => {
    const eventId = req.params.id;
    if (!eventId) {
        throw new ApiError_1.default(400, "Event ID is required.");
    }
    const event = await event_model_1.default.findById({ _id: eventId });
    if (!event) {
        throw new ApiError_1.default(404, "Event not found.");
    }
    if (event.images && event.images.length > 0) {
        event.images.map(async (item) => {
            const deletedImages = await (0, cloudinary_1.deleteTheOldPicture)(item.public_id);
            console.log("Files Deleted", deletedImages);
        });
    }
    await event.deleteOne();
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Event deleted successfully.", event));
});
// get all events
exports.getAllEvents = (0, asyncHandler_1.default)(async (req, res, next) => {
    const events = await event_model_1.default.find();
    if (!events) {
        throw new ApiError_1.default(404, "Event not found.");
    }
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Event fetched successfully.", events));
});
//# sourceMappingURL=event.controller.js.map