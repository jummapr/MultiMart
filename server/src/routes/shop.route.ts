import express from "express";
import { activateShop,createShop } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middlewares";

const router = express.Router();

router.route("/create-shop").post(upload.single("file"),createShop);
router.route("/activate/:activation_token").post(activateShop);

export default router