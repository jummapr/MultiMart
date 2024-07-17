import express from "express";
import { createOrder, getAllUserOrders,getAllSellerOrders } from "../controllers/order.controller";
import { isAuthenticated, isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-order").post(isAuthenticated,createOrder);
router.route("/get-orders/:userId").get(isAuthenticated, getAllUserOrders);
router.route("/get-all-seller-orders/:shopId").get(isSeller, getAllSellerOrders);

export default router;