"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your event product name!"],
    },
    description: {
        type: String,
        required: [true, "Please enter your event product description!"],
    },
    category: {
        type: String,
        required: [true, "Please enter your event product category name!"],
    },
    start_date: {
        type: String,
        required: true,
    },
    finish_date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Running",
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
        required: [true, "Please enter your event product discount price!"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter your event product stock!"],
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
    shop: {
        type: Object,
        required: true,
    },
    sold_out: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const Event = mongoose_1.default.model("event", eventSchema);
exports.default = Event;
//# sourceMappingURL=event.model.js.map