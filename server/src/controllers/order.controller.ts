import { Request, Response } from "express";
import Order from "../models/order.model";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

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

    if (!userId)
      return res.status(400).json(new ApiError(400, "User Id is required."));

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
      return res.status(400).json(new ApiError(400, "Shop Id is required."));
    }


    const orders = await Order.find({ "cart.shopId": sellerId }).sort({
      createdAt: -1,
    });


    res
      .status(200)
      .json(new ApiResponse(200, "Orders fetched successfully.", orders));
  }
);
