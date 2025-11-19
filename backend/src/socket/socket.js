export const activeUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // User registers as online
    socket.on("addUser", (userId) => {
      activeUsers.set(userId, socket.id);
      io.emit("getUsers", Array.from(activeUsers.keys()));
    });

    // Handle messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiverSocket = activeUsers.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("getMessage", {
          senderId,
          text,
          timestamp: new Date()
        });
      }
    });

    // When a user logs out manually
    socket.on("logoutUser", (userId) => {
      activeUsers.delete(userId);
      io.emit("getUsers", Array.from(activeUsers.keys()));
    });

    // When socket disconnects (auto offline)
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
