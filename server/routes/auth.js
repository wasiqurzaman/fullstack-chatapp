import { Router } from "express";
import { handleLogin, handleRegistration, handleLogout } from "../controllers/auth.js";
import { handleRefreshToken } from "../controllers/refreshToken.js";

const router = Router();

router.post("/signup", handleRegistration);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/refresh-token", handleRefreshToken);

export default router;