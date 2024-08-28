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
exports.createReview = exports.getProductById = exports.getShopInfo = exports.getAllProducts = exports.getAllProductFromShop = exports.deleteProductProduct = exports.getAllProduct = exports.createProduct = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = __importStar(require("../utils/cloudinary"));
const product_model_1 = __importDefault(require("../models/product.model"));
const shop_model_1 = __importDefault(require("../models/shop.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
exports.createProduct = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name, description, category, tags, originalPrice, discountPrice, stock, } = req.body;
    const shopId = req.body.shopId;
    if (!shopId) {
        throw new ApiError_1.default(400, "Shop ID is required.");
    }
    const shop = await shop_model_1.default.findById(shopId);
    if (!shop) {
        throw new ApiError_1.default(404, "Shop not found. Please ensure the Shop ID is correct.");
    }
    const files = req.files;
    console.log("Files", files);
    if (!files || files.length === 0) {
        return res.status(400).send("No images provided.");
    }
    const uploadPromises = files.map((file) => (0, cloudinary_1.default)(file.path));
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
    const product = await product_model_1.default.create(productData);
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Product created successfully.", product));
});
// get all product from shop
exports.getAllProduct = (0, asyncHandler_1.default)(async (req, res, next) => {
    const product = await product_model_1.default.find();
    if (!product) {
        throw new ApiError_1.default(404, "product not found. Please ensure the Shop ID is correct.");
    }
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Product fetched successfully.", product));
});
// delete product
exports.deleteProductProduct = (0, asyncHandler_1.default)(async (req, res, next) => {
    const ProductId = req.params.id;
    if (!ProductId) {
        throw new ApiError_1.default(400, "Product ID is required.");
    }
    const product = await product_model_1.default.findById({ _id: ProductId });
    if (!product) {
        throw new ApiError_1.default(404, "Product not found.");
    }
    if (product.images && product.images.length > 0) {
        product.images.map(async (item) => {
            const deletedImages = await (0, cloudinary_1.deleteTheOldPicture)(item.public_id);
            console.log("Files Deleted", deletedImages);
        });
    }
    await product.deleteOne();
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Product deleted successfully.", product));
});
// get all product from shop
exports.getAllProductFromShop = (0, asyncHandler_1.default)(async (req, res, next) => {
    const ProductId = req.params.id;
    if (!ProductId) {
        throw new ApiError_1.default(400, "Product ID is required.");
    }
    const product = await product_model_1.default.find({ shopId: ProductId });
    if (!product) {
        throw new ApiError_1.default(404, "Product not found.");
    }
    res.status(200).json(new ApiResponse_1.default(200, "", product));
});
// get all product
exports.getAllProducts = (0, asyncHandler_1.default)(async (req, res, next) => {
    const products = await product_model_1.default.find().sort({ createdAt: -1 });
    if (!products) {
        throw new ApiError_1.default(404, "Products not found.");
    }
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Products fetched successfully!", products));
});
// get shop info
exports.getShopInfo = (0, asyncHandler_1.default)(async (req, res, next) => {
    const shopId = req.params.id;
    if (!shopId) {
        throw new ApiError_1.default(400, "Shop Id is required.");
    }
    const shop = await shop_model_1.default.findById({ _id: shopId });
    if (!shop) {
        throw new ApiError_1.default(404, "Shop not found.");
    }
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Shop Info fetched successfully!", shop));
});
// get product detail by id
exports.getProductById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const ProductId = req.params.id;
    if (!ProductId) {
        throw new ApiError_1.default(400, "Product Id is required.");
    }
    const product = await product_model_1.default.findById({ _id: ProductId });
    if (!product) {
        throw new ApiError_1.default(404, "Product not found.");
    }
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Product fetched successfully!", product));
});
// create reviews for products
// TODO: if user already give that reviews then review button shoud not appear
// TODO: user review is pending.
exports.createReview = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { user, productId, ratting, comment, orderId } = req.body;
    // get reviews then check if user already reviewed that product or not if yes then update else create
    const product = await product_model_1.default.findById(productId);
    const review = {
        user,
        ratting,
        comment,
        productId,
    };
    const isReviewed = product.reviews.find((rev) => rev.user._id === user._id);
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user._id === user._id) {
                (rev.ratting = ratting), (rev.comment = comment), (rev.user = user);
            }
        });
    }
    else {
        product.reviews.push(review);
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.ratting;
    });
    product.rattings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    await order_model_1.default.findByIdAndUpdate(orderId, { $set: { "cart.$[elem].isReviewed": true } }, { arrayFilters: [{ "elem._id": productId }], new: true });
    res.status(201).json(new ApiResponse_1.default(201, "Reviewed successfully!", {}));
});
//# sourceMappingURL=product.controller.js.map