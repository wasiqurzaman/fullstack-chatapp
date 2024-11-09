import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minLength: [3, "Username must be at least 3 character long."],
    maxLength: [10, "Username can not exceed 10 characters."]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  createdAt: {
    type: Date,
    deafult: Date.now
  },
  chatRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    }
  ],
  refreshToken: {
    token: {
      type: String,
      deafult: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
});

export default mongoose.model("User", UserSchema);