import express from "express";
import { createOrder, getAllUserOrders,getAllSellerOrders, changeOrderStatus, orderRefund } from "../controllers/order.controller";
import { isAuthenticated, isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-order").post(isAuthenticated,createOrder);
router.route("/get-orders/:userId").get(isAuthenticated, getAllUserOrders);
router.route("/get-all-seller-orders/:shopId").get(isSeller, getAllSellerOrders);
router.route("/update-order-status/:orderId").post(isSeller, changeOrderStatus);

router.route("/give-refund/:orderId").put(isAuthenticated, orderRefund);

export default router;