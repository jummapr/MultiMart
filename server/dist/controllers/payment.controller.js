"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiKey = exports.createPayment = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "");
exports.createPayment = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { amount } = req.body;
    console.log(typeof amount);
    const myPayment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "inr",
        description: "Payment for product",
        // TODO: Set Dynamic address and user  
        shipping: {
            name: "Jenny Rosen",
            address: {
                line1: "510 Townsend St",
                postal_code: "98140",
                city: "San Francisco",
                state: "CA",
                country: "US",
            },
        },
        metadata: {
            company: "multimart"
        }
    });
    res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret
    });
});
exports.getApiKey = (0, asyncHandler_1.default)(async (req, res, next) => {
    res.status(200).json({
        success: true,
        apiKey: process.env.STRIPE_API_KEY
    });
});
//# sourceMappingURL=payment.controller.js.map