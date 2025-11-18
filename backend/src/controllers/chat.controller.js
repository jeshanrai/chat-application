import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalChats = await Chat.countDocuments();
    res.json({ totalUsers, totalChats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
