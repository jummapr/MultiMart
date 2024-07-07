import express from "express";
import { createOrder } from "../controllers/order.controller";
import { isAuthenticated } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-order").post(isAuthenticated,createOrder);

export default router;