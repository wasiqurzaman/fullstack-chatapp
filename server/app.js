import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import requestLogger from "./middlewares/logger.js";

import authenticateUser from "./middlewares/authenticateUser.js";
import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";
import MessageRoutes from "./routes/message.js";
import ChatRoomRoutes from "./routes/chatroom.js";

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected!`)
  } catch (err) {
    console.log(' Something went wrong. Could not connect to MongoDB!');
    console.log(err.message);
  }
}

connectDB();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use("/api/auth", AuthRoutes);

app.use(authenticateUser);

app.use("/api/users", UserRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/chatrooms", ChatRoomRoutes);

const connectedSockets = new Set();

io.on("connection", (socket) => {
  connectedSockets.add(socket.id);
  console.log(connectedSockets);

  io.emit("active-users", connectedSockets.size);

  socket.on("disconnect", () => {
    connectedSockets.delete(socket.id);
    io.emit("active-users", connectedSockets.size);
    console.log(connectedSockets);
  })
});


app.get("/", (req, res) => {
  res.send("Hi there!")
})

export default server;