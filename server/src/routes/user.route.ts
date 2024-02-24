import { activateUser, registerUser } from "../controllers/user.controller";
import express from "express";
import { upload } from "../middlewares/multer.middlewares";


const router = express.Router();

router.route("/register").post(upload.single("file"),registerUser)
router.route("/activateuser/:activation_token").post(activateUser)


export default router