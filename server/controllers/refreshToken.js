import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function handleRefreshToken(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ "refreshToken.token": refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign({ username: foundUser.username, id: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    res.json({ id: foundUser._id, accessToken });
  });
}