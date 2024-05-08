import express from "express";
import { LoginToShop, activateShop,createShop, loadSellerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middlewares";
import {  isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-shop").post(upload.single("file"),createShop);
router.route("/activate/:activation_token").post(activateShop);
router.route("/shop-login").post(LoginToShop)
router.route("/load-seller").get(isSeller,loadSellerUser)

export default router