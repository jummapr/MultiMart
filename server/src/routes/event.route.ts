import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getAllEventsFromShop,
} from "../controllers/event.controller";
import { upload } from "../middlewares/multer.middlewares";
import { isSeller } from "../middlewares/auth.middlewares";
const router = express.Router();

router.route("/create-event").post(upload.array("files"), createEvent);
router.route("/get-all-event/:shopId").get(isSeller, getAllEventsFromShop);
router.route("/delete-event/:id").delete(isSeller, deleteEvent);
router.route("/get-all-events").get(getAllEvents);

export default router;
