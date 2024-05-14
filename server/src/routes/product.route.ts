import express from "express";
import {
  createProduct,
  deleteProductProduct,
  getAllProduct,
} from "../controllers/product.controller";
import { upload } from "../middlewares/multer.middlewares";
import { isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-product").post(upload.array("files"), createProduct);
router.route("/get-all-product/:shopId").get(isSeller, getAllProduct);
router.route("/delete-product/:id").delete(isSeller, deleteProductProduct);

export default router;
