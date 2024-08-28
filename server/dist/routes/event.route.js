"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../controllers/event.controller");
const multer_middlewares_1 = require("../middlewares/multer.middlewares");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = express_1.default.Router();
router.route("/create-event").post(multer_middlewares_1.upload.array("files"), event_controller_1.createEvent);
router.route("/get-all-event/:shopId").get(auth_middlewares_1.isSeller, event_controller_1.getAllEventsFromShop);
router.route("/delete-event/:id").delete(auth_middlewares_1.isSeller, event_controller_1.deleteEvent);
router.route("/get-all-events").get(event_controller_1.getAllEvents);
exports.default = router;
//# sourceMappingURL=event.route.js.map