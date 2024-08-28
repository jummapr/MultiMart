"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSeller = exports.isAuthenticated = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shop_model_1 = __importDefault(require("../models/shop.model"));
exports.isAuthenticated = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { token, seller_token } = req.cookies;
    console.log("Seller Token", seller_token);
    if (!token) {
        throw new ApiError_1.default(400, "Please login first then you can continue.");
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded, "Decoded Data Log");
    req.user = await user_model_1.default.findById(decoded.id);
    next();
});
exports.isSeller = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { seller_token } = req.cookies;
    // console.log("Seller Token",seller_token)
    if (!seller_token) {
        throw new ApiError_1.default(400, "Please login seller account first then you can continue.");
    }
    const decoded = jsonwebtoken_1.default.verify(seller_token, process.env.JWT_SECRET_KEY);
    console.log(decoded, "Decoded Data Log");
    req.user = await shop_model_1.default.findById(decoded.id);
    next();
});
//# sourceMappingURL=auth.middlewares.js.map