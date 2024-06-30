import express from "express";
import {
  createCouponCode,
  deleteCoupon,
  getCoupon,
  getCouponByName,
} from "../controllers/coupon.controller";
import { isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-coupon").post(isSeller, createCouponCode);
router.route("/get-all-coupon/:shopId").get(isSeller, getCoupon);
router.route("/delete-coupon/:id").delete(isSeller, deleteCoupon);
router.route("/get-coupon-by-name/:name").get( getCouponByName);

export default router;
