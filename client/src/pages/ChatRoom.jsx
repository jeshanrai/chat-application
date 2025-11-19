import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatInput from "../components/ChatInput";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";

const ChatRoom = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { socket } = useSocket();

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Receive messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("getMessage", handleMessage);
    return () => socket.off("getMessage", handleMessage);
  }, [socket]);

  // Load history
  useEffect(() => {
    if (!selectedUser?._id) return;

    const loadHistory = async () => {
      const res = await fetch(
        `${API_URL}/api/chat/${currentUser._id}/${selectedUser._id}`
      );
      const data = await res.json();

      const normalized = data.map((msg) => ({
        ...msg,
        senderId: msg.senderId.toString(),
        receiverId: msg.receiverId.toString(),
      }));

      setMessages(normalized);
    };

    loadHistory();
  }, [selectedUser]);

  const sendMessage = () => {
    if (!message.trim() || !selectedUser?._id) return;

    const newMessage = {
      _id: Date.now(),
      senderId: currentUser._id.toString(),
      receiverId: selectedUser._id.toString(),
      text: message,
      timestamp: new Date(),
    };

    socket.emit("sendMessage", newMessage);

    fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === currentUser._id &&
        msg.receiverId === selectedUser?._id) ||
      (msg.senderId === selectedUser?._id &&
        msg.receiverId === currentUser._id)
  );

  return (
    <div className="flex flex-1 ml-2 mr-2 rounded-lg overflow-hidden">
      <Sidebar onSelectUser={setSelectedUser} />

      <div className="flex flex-col flex-1 ml-2 mt-2 border rounded-lg h-[90.5vh] overflow-hidden">
        {selectedUser ? (
          <>
            <ChatList
              selectedUser={selectedUser}
              currentUser={currentUser}
              messages={filteredMessages}
            />
            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
