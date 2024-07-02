import express from "express";
import {createPayment,getApiKey} from "../controllers/payment.controller"
import { upload } from "../middlewares/multer.middlewares";
import { isAuthenticated } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/process").post(isAuthenticated,createPayment);
router.route("/stripeapikey").get(isAuthenticated,getApiKey)

export default router;