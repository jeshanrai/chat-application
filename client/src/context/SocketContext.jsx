import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle user online/offline
  useEffect(() => {
    if (!socket || !user?._id) return;

    // Notify server user is online
    socket.emit("addUser", user._id);

    // Listen for online users list
    socket.on("getUsers", (onlineUserIds) => {
      setOnlineUsers(onlineUserIds);
    });

    // On unmount or user change, notify logout
    return () => {
      socket.emit("logoutUser", user._id);
      socket.off("getUsers");
    };
  }, [socket, user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
