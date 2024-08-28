"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCouponDetail = exports.getCouponByName = exports.deleteCoupon = exports.getCoupon = exports.createCouponCode = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const coupon_model_1 = __importDefault(require("../models/coupon.model"));
// create coupon code
exports.createCouponCode = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name, value, minAmount, maxAmount, shopId, selectedProducts } = req.body;
    const isCouponCodeExist = await coupon_model_1.default.find({ name });
    if (!isCouponCodeExist) {
        throw new ApiError_1.default(400, "Coupon code already exist.");
    }
    if (!name || !value || !shopId) {
        throw new ApiError_1.default(400, "All field required.");
    }
    const couponCode = await coupon_model_1.default.create({
        name,
        value,
        minAmount,
        maxAmount,
        shopId,
        selectedProducts,
    });
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Coupon Code created successfully.", couponCode));
});
// get all coupon
exports.getCoupon = (0, asyncHandler_1.default)(async (req, res, next) => {
    const shopId = req.params.shopId;
    if (!shopId) {
        throw new ApiError_1.default(400, "Shop ID is required.");
    }
    const coupon = await coupon_model_1.default.find({ shopId });
    if (!coupon) {
        throw new ApiError_1.default(404, "Coupon not found. Please ensure the Shop ID is correct.");
    }
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "coupon fetched successfully.", coupon));
});
// Delete coupon Code
exports.deleteCoupon = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throw new ApiError_1.default(400, "Coupon is required.");
    }
    const coupon = await coupon_model_1.default.findByIdAndDelete({ _id: id });
    if (!coupon) {
        throw new ApiError_1.default(404, "Coupon not found. Please ensure the coupon Id is correct.");
    }
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "coupon deleted successfully.", coupon));
});
// get coupon code value by it's name
exports.getCouponByName = (0, asyncHandler_1.default)(async (req, res, next) => {
    const name = req.params.name;
    if (!name) {
        throw new ApiError_1.default(400, "Name is required.");
    }
    const coupon = await coupon_model_1.default.find({ name });
    if (!coupon) {
        throw new ApiError_1.default(404, "Coupon not found. Please ensure the coupon name is correct.");
    }
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Coupon retrieved successfully.", coupon));
});
exports.getCouponDetail = (0, asyncHandler_1.default)(async (req, res, next) => {
    const ID = req.params.id;
    const coupon = await coupon_model_1.default.find({ _id: ID });
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Coupon retrieved successfully.", coupon));
});
//# sourceMappingURL=coupon.controller.js.map