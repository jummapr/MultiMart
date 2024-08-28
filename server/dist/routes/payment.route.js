"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = express_1.default.Router();
router.route("/process").post(auth_middlewares_1.isAuthenticated, payment_controller_1.createPayment);
router.route("/stripeapikey").get(auth_middlewares_1.isAuthenticated, payment_controller_1.getApiKey);
exports.default = router;
//# sourceMappingURL=payment.route.js.map