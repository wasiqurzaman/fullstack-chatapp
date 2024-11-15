
import { Router } from "express";
import { getChatRoomInfo, createChatRoom, updateChatRoom, deleteChatRoom, getAllChats, joinChatRoom, addMember, removeMember } from "../controllers/chatroom.js";


const router = Router();

router.post("/", createChatRoom);
router.get("/:id", getChatRoomInfo);
router.put("/:id", updateChatRoom);
router.delete("/:id", deleteChatRoom);
router.get("/:id/chats", getAllChats);
router.post("/:id/join", joinChatRoom);
router.post("/:id/add-member", addMember);
router.post("/:id/remove-member", removeMember);

export default router;