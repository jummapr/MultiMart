"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your product name!"],
    },
    description: {
        type: String,
        required: [true, "Please enter your product description!"],
    },
    category: {
        type: String,
        required: [true, "Please enter your product category name!"],
    },
    tags: {
        type: String,
    },
    originalPrice: {
        type: Number,
        required: false,
    },
    discountPrice: {
        type: Number,
        required: [true, "Please enter your product discount price!"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter your product stock!"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    shopId: {
        type: String,
        required: true,
    },
    reviews: [
        {
            user: {
                type: Object,
            },
            ratting: {
                type: Number,
            },
            comment: {
                type: String,
            },
            productId: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            }
        },
    ],
    rattings: {
        type: Number,
    },
    shop: {
        type: Object,
        required: true,
    },
    sold_out: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map