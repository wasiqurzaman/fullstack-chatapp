import { Router } from "express";
import { deleteMessage, sendMessage, updateMessage } from "../controllers/message.js";

const router = Router();

router.post("/", sendMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;