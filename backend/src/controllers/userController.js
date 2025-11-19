import User from "../models/User.js";
import { activeUsers } from "../socket/socket.js";  // ⬅ import the active users map

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id username email");

    const usersWithOnlineStatus = users.map(user => ({
      ...user._doc,
      online: activeUsers.has(user._id.toString())   // ⭐ online field added
    }));

    res.json(usersWithOnlineStatus);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
};
