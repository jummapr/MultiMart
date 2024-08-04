import { Request, Response } from "express";
import Order from "../models/order.model";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import Product from "../models/product.model";

// create new order

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

  //  group cart items by shop Id
  const shopItemsMap = new Map<any, any>();

  for (const item of cart) {
    const shopId = item.shopId;
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, []);
    }
    shopItemsMap.get(shopId).push(item);
  }

  //  create an order for each shop
  const orders: any = [];

  shopItemsMap.forEach(async (items, shopId) => {
    const order = await Order.create({
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
    .json(new ApiResponse(200, "Order created successfully.", orders));
});

// get all user of the orders
export const getAllUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
      throw new ApiError(400, "User Id is required.");
    }

    const orders = await Order.find({ "user._id": userId }).sort({
      createdAt: -1,
    });

    // console.log(orderData);
    res
      .status(200)
      .json(new ApiResponse(200, "Orders fetched successfully.", orders));
  }
);

// get all seller orders

export const getAllSellerOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const sellerId = req.params.shopId;

    if (!sellerId) {
      throw new ApiError(400, "Shop Id is required.");
    }

    const orders = await Order.find({ "cart.shopId": sellerId }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Orders fetched successfully.", orders));
  }
);

// Order Status Changed NOTE: Only seller can change
export const changeOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const {status} = req.body;

    // Event thogh I sending data from client but still body is undefined. I'll  work later after sleep.
    console.log("Body: ", req.body);
    
    console.log("Order Id: ", orderId);
    console.log("Started..");

    if (!orderId) {
      throw new ApiError(400, "Order Id is required.");
    }

    if(!status) {
      throw new ApiError(400, "Status is required.")
    }

    console.log("Validation cheked..");

    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(400, "Order not found.");
    }

    if(status === "Transfer to delivery partner") {
      order.cart.forEach(async (item: any) => {
          await updateProduct(item._id, item.qty, "Transfer to delivery partner");
      })
    }

    async function updateProduct(id: string, qty: number, status: string) {
      const product = await Product.findById(id);

      if (!product) {
        throw new ApiError(404, "Product not found.");
      }

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    order.status = status;

    if(status === "Delivered") {
      // @ts-ignore
      order.deliverAt = Date.now();
      order.paymentInfo.status = "Succeeded";
    }

    await order.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, "Order status updated successful.", order));
  }
);

// give refund 
export const orderRefund = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const {status} = req.body;


    if (!orderId) {
      throw new ApiError(400, "Order Id is required.");
    }

    if(!status) {
      throw new ApiError(400, "Status is required.");
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(400, "Order not found.");
    }

    order.status = status;
    
    await order.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, "Order refund successful.", order));
  }
);
