import Message from "../models/message.js";
import ChatRoom from "../models/chatRoom.js";

export const sendMessage = async (req, res) => {
  try {
    const user = req.user;
    const { content, roomId, senderId } = req.body;
    if (!content) return res.status(400).json({ message: "content is required" });
    if (!roomId) return res.status(400).json({ message: "roomId is required" });

    const room = await ChatRoom.findById(roomId).exec();
    if (!room) return res.status(400).json({ message: `roomId not found` });

    const message = await Message.create({
      content,
      roomId: room._id,
      senderId: senderId || user._id,
      timestamp: new Date(),
    });

    room.messages.push(message._id);
    await room.save();

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const recieveMessage = async (req, res) => {

}

export const updateMessage = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params?.id;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "content is required" });
    const foundMessage = await Message.findOne({ _id: id }).exec();
    if (!foundMessage) return res.status(400).json({ message: "message not found" });

    if (foundMessage.senderId.toString() !== user._id.toString()) return res.status(401).json({ message: "you are not allowed to update the message" });

    foundMessage.content = content;
    const updatedMessage = await foundMessage.save();

    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params?.id;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "content is required" });
    const foundMessage = await Message.findOne({ _id: id }).exec();
    if (!foundMessage) return res.status(400).json({ message: "message not found" });

    if (foundMessage.senderId.toString() !== user._id.toString()) return res.status(401).json({ message: "you are not allowed to update the message" });

    const deletedMessage = await foundMessage.deleteOne({ _id: id });

    res.json(deleteMessage);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}