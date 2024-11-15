import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Chat room name is required."]
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model("ChatRoom", chatRoomSchema);
