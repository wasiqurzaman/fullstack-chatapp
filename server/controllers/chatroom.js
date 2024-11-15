import ChatRoom from "../models/chatRoom.js";
import user from "../models/user.js";
import User from "../models/user.js";


export const getChatRoomInfo = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ message: "id is required" });
    const chatroom = await ChatRoom.findById(id).exec();
    if (!chatroom) {
      return res.status(400).json({ message: `Chatroom with id ${id} is not found.` });
    }
    res.json(chatroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createChatRoom = async (req, res) => {
  try {
    const user = req.user;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });

    const chatroom = await ChatRoom.create({
      name
    });
    chatroom.members.push(user._id);
    chatroom.admins.push(user._id);
    user.chatRooms.push(chatroom._id);

    const savedChatroom = await chatroom.save();
    await user.save();
    res.status(201).json({ savedChatroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const updateChatRoom = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params?.id;
    const { name } = req.body;
    if (!id) return res.status(400).json({ message: "id is required" });
    if (!name) return res.status(400).json({ message: "name is required" });

    const chatroom = await ChatRoom.findById(id).exec();
    if (!chatroom) {
      return res.status(400).json({ message: `Chatroom with id ${id} is not found.` });
    }

    const isAdmin = chatroom.admins.includes(user._id);
    if (!isAdmin) return res.status(401).json({ message: "you are not authorized to update the chatroom" });

    chatroom.name = name;
    const savedChatroom = await chatroom.save();
    await user.save();
    res.status(201).json({ savedChatroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const deleteChatRoom = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params?.id;
    if (!id) return res.status(400).json({ message: "id is required" });

    const chatroom = await ChatRoom.findById(id).exec();
    if (!chatroom) {
      return res.status(400).json({ message: `Chatroom with id ${id} is not found.` });
    }
    const isAdmin = chatroom.admins.includes(user._id);

    if (!isAdmin) return res.status(401).json({ message: "you are not authorized to delete the chatroom" });

    const deleted = await ChatRoom.findByIdAndDelete(id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getAllChats = async (req, res) => {
  try {
    const id = req.params?.id;
    const user = req.user;
    if (!id) return res.status(400).json({ message: "id is required" });
    const chatroom = await ChatRoom.findById(id).populate("messages", { id: 1, content: 1, senderId: 1, timestamp: 1 }).exec();

    const isMember = chatroom.members.includes(user._id);
    if (!isMember) return res.status(401).json({ message: "only members can see the messages" });
    console.log(isMember);
    console.log(chatroom);
    res.json(chatroom.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const joinChatRoom = async (req, res) => {
  try {
    const id = req.params?.id;
    const user = req.user;
    if (!id) return res.status(400).json({ message: "id is required" });
    const chatroom = await ChatRoom.findById(id).exec();
    if (!chatroom) {
      return res.status(400).json({ message: `Chatroom with id ${id} is not found.` });
    }

    const isMember = chatroom.members.includes(user._id);
    if (isMember) return res.status(400).json({ message: "You are alrealy a member" });

    chatroom.members.push(user._id);

    const savedChatroom = await chatroom.save();
    res.status(201).json({ savedChatroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const addMember = async (req, res) => {
  try {
    const id = req.params?.id;
    const user = req.user;
    const { memberId } = req.body;
    if (!id) return res.status(400).json({ message: "id is required" });
    if (!memberId) return res.status(400).json({ message: "memberid is required" });
    const chatroom = await ChatRoom.findById(id).exec();
    if (!chatroom) {
      return res.status(400).json({ message: `Chatroom with id ${id} is not found.` });
    }

    const isAdmin = chatroom.admins.includes(user._id);
    if (!isAdmin) return res.status(401).json({ message: "only admins can add new members" });
    const isMember = chatroom.members.includes(user._id);
    if (isMember) return res.status(400).json({ message: "already a member" });

    chatroom.members.push(memberId);
    const savedChatroom = await chatroom.save();
    res.status(201).json({ savedChatroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const removeMember = async (req, res) => {
  try {
    const id = req.params?.id;
    const user = req.user;
    const { memberId } = req.body;
    if (!id) return res.status(400).json({ message: "id is required" });
    if (!memberId) return res.status(400).json({ message: "memberid is required" });
    const chatroom = await ChatRoom.findById(id).exec();
    if (!chatroom) {
      return res.status(400).json({ message: `Chatroom with id ${id} is not found.` });
    }

    const isAdmin = chatroom.admins.includes(user._id);
    if (!isAdmin) return res.status(401).json({ message: "only admins can remove members" });
    const isMember = chatroom.members.includes(user._id);
    if (!isMember) return res.status(400).json({ message: "not a member" });

    chatroom.members.filter(member => member._id !== memberId);
    const savedChatroom = await chatroom.save();
    res.status(201).json({ savedChatroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

