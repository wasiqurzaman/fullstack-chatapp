import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser.js";
import { getUser, updateUser, deleteUser } from "../controllers/user.js";

const router = Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;