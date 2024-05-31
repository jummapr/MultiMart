import express from "express";
import {
  LoginToShop,
  activateShop,
  createShop,
  loadSellerUser,
  shopLogout,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middlewares";
import { isAuthenticated, isSeller } from "../middlewares/auth.middlewares";
import { getAllProductFromShop, getShopInfo } from "../controllers/product.controller";

const router = express.Router();

router.route("/create-shop").post(upload.single("file"), createShop);
router.route("/activate/:activation_token").post(activateShop);
router.route("/shop-login").post(LoginToShop);
router.route("/load-seller").get(isSeller, loadSellerUser);
router.route("/logoutshop").get(isSeller, shopLogout);
router.route("/get-shop-info/:id").get(getShopInfo)
router.route("/get-all-seller-product/:id").get(isSeller,getAllProductFromShop)

export default router;
