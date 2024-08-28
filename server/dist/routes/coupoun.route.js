"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coupon_controller_1 = require("../controllers/coupon.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = express_1.default.Router();
router.route("/create-coupon").post(auth_middlewares_1.isSeller, coupon_controller_1.createCouponCode);
router.route("/get-all-coupon/:shopId").get(auth_middlewares_1.isSeller, coupon_controller_1.getCoupon);
router.route("/delete-coupon/:id").delete(auth_middlewares_1.isSeller, coupon_controller_1.deleteCoupon);
router.route("/get-coupon-by-name/:name").get(coupon_controller_1.getCouponByName);
exports.default = router;
//# sourceMappingURL=coupoun.route.js.map