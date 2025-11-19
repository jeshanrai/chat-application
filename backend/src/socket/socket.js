export const activeUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // User registers as online
    socket.on("addUser", (userId) => {
      activeUsers.set(userId, socket.id);
      io.emit("getUsers", Array.from(activeUsers.keys()));
    });

    // include receiverId + unique id in response
    socket.on("sendMessage", ({ _id, senderId, receiverId, text, timestamp }) => {
      const receiverSocket = activeUsers.get(receiverId);

      if (receiverSocket) {
        io.to(receiverSocket).emit("getMessage", {
          _id,
          senderId,
          receiverId,
          text,
          timestamp,
        });
      }
    });

    socket.on("logoutUser", (userId) => {
      activeUsers.delete(userId);
      io.emit("getUsers", Array.from(activeUsers.keys()));
    });

    socket.on("disconnect", () => {
      for (let [userId, id] of activeUsers) {
        if (id === socket.id) {
          activeUsers.delete(userId);
          io.emit("getUsers", Array.from(activeUsers.keys()));
          break;
        }
      }
    });
  });
};

export default socketHandler;
