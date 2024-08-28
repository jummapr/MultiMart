"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAcceptRefund = exports.orderRefund = exports.changeOrderStatus = exports.getAllSellerOrders = exports.getAllUserOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const product_model_1 = __importDefault(require("../models/product.model"));
// create new order
exports.createOrder = (0, asyncHandler_1.default)(async (req, res) => {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
    //  group cart items by shop Id
    const shopItemsMap = new Map();
    for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
            shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
    }
    //  create an order for each shop
    const orders = [];
    shopItemsMap.forEach(async (items, shopId) => {
        const order = await order_model_1.default.create({
            cart: items,
            shippingAddress,
            user,
            totalPrice,
            paymentInfo,
        });
        orders.push(order);
    });
    // for (const [shopId, items] of shopItemsMap) {
    //   const order = await Order.create({
    //     cart: items,
    //     shippingAddress,
    //     user,
    //     totalPrice,
    //     paymentInfo,
    //   });
    //   orders.push(order);
    // }
    res
        .status(201)
        .json(new ApiResponse_1.default(200, "Order created successfully.", orders));
});
// get all user of the orders
exports.getAllUserOrders = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        throw new ApiError_1.default(400, "User Id is required.");
    }
    const orders = await order_model_1.default.find({ "user._id": userId }).sort({
        createdAt: -1,
    });
    // console.log(orderData);
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Orders fetched successfully.", orders));
});
// get all seller orders
exports.getAllSellerOrders = (0, asyncHandler_1.default)(async (req, res) => {
    const sellerId = req.params.shopId;
    if (!sellerId) {
        throw new ApiError_1.default(400, "Shop Id is required.");
    }
    const orders = await order_model_1.default.find({ "cart.shopId": sellerId }).sort({
        createdAt: -1,
    });
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Orders fetched successfully.", orders));
});
// Order Status Changed NOTE: Only seller can change
exports.changeOrderStatus = (0, asyncHandler_1.default)(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    // Event thogh I sending data from client but still body is undefined. I'll  work later after sleep.
    console.log("Body: ", req.body);
    console.log("Order Id: ", orderId);
    console.log("Started..");
    if (!orderId) {
        throw new ApiError_1.default(400, "Order Id is required.");
    }
    if (!status) {
        throw new ApiError_1.default(400, "Status is required.");
    }
    console.log("Validation cheked..");
    const order = await order_model_1.default.findById(orderId);
    if (!order) {
        throw new ApiError_1.default(400, "Order not found.");
    }
    if (status === "Transfer to delivery partner") {
        order.cart.forEach(async (item) => {
            await updateProduct(item._id, item.qty, "Transfer to delivery partner");
        });
    }
    async function updateProduct(id, qty, status) {
        const product = await product_model_1.default.findById(id);
        if (!product) {
            throw new ApiError_1.default(404, "Product not found.");
        }
        product.stock -= qty;
        product.sold_out += qty;
        await product.save({ validateBeforeSave: false });
    }
    order.status = status;
    if (status === "Delivered") {
        // @ts-ignore
        order.deliverAt = Date.now();
        order.paymentInfo.status = "Succeeded";
    }
    await order.save({ validateBeforeSave: false });
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Order status updated successful.", order));
});
// give refund 
exports.orderRefund = (0, asyncHandler_1.default)(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!orderId) {
        throw new ApiError_1.default(400, "Order Id is required.");
    }
    if (!status) {
        throw new ApiError_1.default(400, "Status is required.");
    }
    const order = await order_model_1.default.findById(orderId);
    if (!order) {
        throw new ApiError_1.default(400, "Order not found.");
    }
    order.status = status;
    await order.save({ validateBeforeSave: false });
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Order refund successful.", order));
});
// Admin: accept the refund.
exports.adminAcceptRefund = (0, asyncHandler_1.default)(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!orderId) {
        throw new ApiError_1.default(400, "Order Id is required.");
    }
    const order = await order_model_1.default.findById(orderId);
    if (!order) {
        throw new ApiError_1.default(400, "Order not found.");
    }
    order.status = status;
    await order.save();
    res.status(200).json(new ApiResponse_1.default(200, "Order refund accepted.", order));
    if (status === "Refund success") {
        order.cart.forEach(async (item) => {
            await updateProduct(item._id, item.qty);
        });
    }
    async function updateProduct(id, qty) {
        const product = await product_model_1.default.findById(id);
        if (!product) {
            throw new ApiError_1.default(404, "Product not found.");
        }
        product.stock += qty;
        product.sold_out -= qty;
        await product.save({ validateBeforeSave: false });
    }
});
//# sourceMappingURL=order.controller.js.map