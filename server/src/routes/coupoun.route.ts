import express from "express";
import { createCouponCode } from "../controllers/coupon.controller";
import { isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-coupon").post(isSeller, createCouponCode);
// router.route("/get-all-event/:shopId").get(isSeller, getAllEvents);
// router.route("/delete-event/:id").delete(isSeller, deleteEvent);

export default router;
