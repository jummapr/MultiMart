import express from "express";
import {
  createProduct,
  createReview,
  deleteProductProduct,
  getAllProduct,
  getProductById,
} from "../controllers/product.controller";
import { upload } from "../middlewares/multer.middlewares";
import { isSeller, isAuthenticated } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-product").post(upload.array("files"), createProduct);
router.route("/get-all-product").get(getAllProduct);
router.route("/delete-product/:id").delete(isSeller, deleteProductProduct);
router.route("/product-detail/:id").get(getProductById);

router.route("/reviewed-product").patch(isAuthenticated,createReview);

export default router;
