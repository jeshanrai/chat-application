import { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      socketRef.current = io("http://localhost:5000", {
        auth: { token: user?.token },
      });
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
