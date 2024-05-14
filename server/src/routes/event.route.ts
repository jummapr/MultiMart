import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
} from "../controllers/event.controller";
import { upload } from "../middlewares/multer.middlewares";
import { isSeller } from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/create-event").post(upload.array("files"), createEvent);
router.route("/get-all-event/:shopId").get(isSeller, getAllEvents);
router.route("/delete-event/:id").delete(isSeller, deleteEvent);

export default router;
