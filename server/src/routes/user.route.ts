import { activateUser, loadUser, loginUser, registerUser } from "../controllers/user.controller";
import express from "express";
import { upload } from "../middlewares/multer.middlewares";
import { isAuthenticated } from "../middlewares/auth.middlewares";


const router = express.Router();

router.route("/register").post(upload.single("file"),registerUser)
router.route("/activateuser/:activation_token").post(activateUser);
router.route("/login").post(loginUser)
router.route("/getuser").get(isAuthenticated,loadUser)

export default router