"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multer_middlewares_1 = require("../middlewares/multer.middlewares");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router.route("/create-shop").post(multer_middlewares_1.upload.single("file"), user_controller_1.createShop);
router.route("/activate/:activation_token").post(user_controller_1.activateShop);
router.route("/shop-login").post(user_controller_1.LoginToShop);
router.route("/load-seller").get(auth_middlewares_1.isSeller, user_controller_1.loadSellerUser);
router.route("/logoutshop").get(auth_middlewares_1.isSeller, user_controller_1.shopLogout);
router.route("/get-shop-info/:id").get(product_controller_1.getShopInfo);
router.route("/get-all-seller-product/:id").get(auth_middlewares_1.isSeller, product_controller_1.getAllProductFromShop);
exports.default = router;
//# sourceMappingURL=shop.route.js.map