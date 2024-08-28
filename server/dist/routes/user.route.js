"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const multer_middlewares_1 = require("../middlewares/multer.middlewares");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = express_1.default.Router();
router.route("/register").post(multer_middlewares_1.upload.single("file"), user_controller_1.registerUser);
router.route("/activateuser/:activation_token").post(user_controller_1.activateUser);
router.route("/login").post(user_controller_1.loginUser);
router.route("/getuser").get(auth_middlewares_1.isAuthenticated, user_controller_1.loadUser);
router.route("/logout").get(auth_middlewares_1.isAuthenticated, user_controller_1.logoutUser);
router.route("/update-user-info").put(auth_middlewares_1.isAuthenticated, user_controller_1.updateUserInfo);
router
    .route("/update-avatar")
    .put(auth_middlewares_1.isAuthenticated, multer_middlewares_1.upload.single("file"), user_controller_1.updateUserAvatar);
router.route("/update-user-address").put(auth_middlewares_1.isAuthenticated, user_controller_1.updateUserAddress);
router.route("/delete-user-address/:addresstype").delete(auth_middlewares_1.isAuthenticated, user_controller_1.deleteUserAddress);
router.route("/update-password").patch(auth_middlewares_1.isAuthenticated, user_controller_1.updateUserPassword);
exports.default = router;
//# sourceMappingURL=user.route.js.map