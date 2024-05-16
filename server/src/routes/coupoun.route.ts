import express from "express";
import {
  createCouponCode,
  deleteCoupon,
  getCoupon,
} from "../controllers/coupon.controller";
import { isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-coupon").post(isSeller, createCouponCode);
router.route("/get-all-coupon/:shopId").get(isSeller, getCoupon);
router.route("/delete-coupon/:id").delete(isSeller, deleteCoupon);

export default router;
