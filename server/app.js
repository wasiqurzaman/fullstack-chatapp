import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hi there!")
})

export default app;