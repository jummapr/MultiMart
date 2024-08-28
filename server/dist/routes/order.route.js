"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = express_1.default.Router();
router.route("/create-order").post(auth_middlewares_1.isAuthenticated, order_controller_1.createOrder);
router.route("/get-orders/:userId").get(auth_middlewares_1.isAuthenticated, order_controller_1.getAllUserOrders);
router.route("/get-all-seller-orders/:shopId").get(auth_middlewares_1.isSeller, order_controller_1.getAllSellerOrders);
router.route("/update-order-status/:orderId").post(auth_middlewares_1.isSeller, order_controller_1.changeOrderStatus);
router.route("/give-refund/:orderId").put(auth_middlewares_1.isAuthenticated, order_controller_1.orderRefund);
router.route("/accept-refund/:orderId").put(auth_middlewares_1.isSeller, order_controller_1.adminAcceptRefund);
exports.default = router;
//# sourceMappingURL=order.route.js.map