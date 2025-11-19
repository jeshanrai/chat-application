const activeUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("addUser", (userId) => {
      activeUsers.set(userId, socket.id);
      console.log(`🟢 User added: ${userId} with socket ID: ${socket.id}`);
      console.log("Current active users:", Array.from(activeUsers.keys()));
      io.emit("getUsers", Array.from(activeUsers.keys()));
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      console.log(`📨 Message from ${senderId} to ${receiverId}: ${text}`);
      const receiverSocket = activeUsers.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("getMessage", { senderId, text, timestamp: new Date() });
        console.log(`✅ Message delivered to socket ID: ${receiverSocket}`);
      } else {
        console.log(`⚠️ Receiver ${receiverId} not connected`);
        // Optional: store in DB for offline delivery
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      for (let [userId, id] of activeUsers) {
        if (id === socket.id) {
          activeUsers.delete(userId);
          console.log(`🟠 Removed user ${userId} from active users`);
          break;
        }
      }
    });
  });
};

export default socketHandler;
