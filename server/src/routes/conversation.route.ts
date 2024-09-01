import express from "express";
import {isAuthenticated} from "../middlewares/auth.middlewares";
import {createConversation} from "../controllers/conversation.controller";

const router = express.Router();

router.route("/create-conversation").post(isAuthenticated, createConversation);

export default router;
