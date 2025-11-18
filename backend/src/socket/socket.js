import Chat from "../models/Chat.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async (data) => {
      await Chat.create({ sender: data.sender, message: data.message });
      io.emit("message", data);
    });

    socket.on("userJoined", (username) => {
      io.emit("join", username);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
