import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.static());

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