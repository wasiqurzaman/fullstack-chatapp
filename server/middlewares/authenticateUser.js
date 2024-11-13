import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);

  const token = authHeader.split(" ").at(1);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
    if (error) return res.status(401).json({ error: "invalid token" }) // invalid token
    const authenticatedUser = await User.findById(decoded.id);
    if (!authenticatedUser) return res.sendStatus(401);

    req.user = authenticatedUser;
    next();
  })
}