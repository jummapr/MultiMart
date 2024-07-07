import { Request, Response } from "express";
import Order from "../models/order.model";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";

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

  res.status(201).json(new ApiResponse(200, "Order created successfully.", orders));
});
