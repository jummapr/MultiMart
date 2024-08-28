"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const multer_middlewares_1 = require("../middlewares/multer.middlewares");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = express_1.default.Router();
router.route("/create-product").post(multer_middlewares_1.upload.array("files"), product_controller_1.createProduct);
router.route("/get-all-product").get(product_controller_1.getAllProduct);
router.route("/delete-product/:id").delete(auth_middlewares_1.isSeller, product_controller_1.deleteProductProduct);
router.route("/product-detail/:id").get(product_controller_1.getProductById);
router.route("/reviewed-product").patch(auth_middlewares_1.isAuthenticated, product_controller_1.createReview);
exports.default = router;
//# sourceMappingURL=product.route.js.map