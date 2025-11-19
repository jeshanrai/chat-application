import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatInput from "../components/ChatInput";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatRoom = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Register current user on socket
  useEffect(() => {
    if (currentUser?._id) {
      socket.emit("addUser", currentUser._id);
      console.log("✅ Current user registered on socket:", currentUser._id);
    }
  }, [currentUser?._id]);

  // Listen for incoming messages safely
  useEffect(() => {
    const handleMessage = (data) => {
      console.log("📨 New message received:", data);

      // Safety checks
      if (!data || !data.senderId || !data.receiverId || !selectedUser?._id) return;

      const senderId = data.senderId.toString();
      const receiverId = data.receiverId.toString();
      const selectedId = selectedUser._id.toString();
      const currentId = currentUser._id.toString();

      // Only add if it belongs to current chat
      if (
        (senderId === currentId && receiverId === selectedId) ||
        (receiverId === currentId && senderId === selectedId)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("getMessage", handleMessage);
    return () => socket.off("getMessage", handleMessage);
  }, [selectedUser, currentUser?._id]);

  // Load chat history
  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/chat/${currentUser._id}/${selectedUser._id}`
        );
        if (!response.ok) throw new Error("Failed to fetch chat");

        const data = await response.json();
        const normalizedMessages = data.map((msg) => ({
          ...msg,
          senderId: msg.senderId?.toString(),
          receiverId: msg.receiverId?.toString(),
        }));

        setMessages(normalizedMessages);
        console.log("📂 Chat history loaded:", normalizedMessages);
      } catch (err) {
        console.error("❌ Failed to load chat history:", err);
      }
    };

    fetchChatHistory();
  }, [selectedUser, currentUser._id]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !selectedUser?._id) return;

    const newMessage = {
      _id: Date.now() + Math.random(),
      senderId: currentUser._id.toString(),
      receiverId: selectedUser._id.toString(),
      text: message,
      timestamp: new Date(),
    };

    socket.emit("sendMessage", newMessage);
    console.log("📨 Message sent via socket:", newMessage);

    fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    }).catch((err) => console.error("❌ Failed to save message:", err));

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.senderId?.toString() === currentUser._id.toString() &&
      msg.receiverId?.toString() === selectedUser?._id.toString() ||
      msg.senderId?.toString() === selectedUser?._id.toString() &&
      msg.receiverId?.toString() === currentUser._id.toString()
  );

  return (
    <div className="flex flex-1 ml-2 mr-2 rounded-lg overflow-hidden">
      <Sidebar onSelectUser={setSelectedUser} />
      <div className="flex flex-col flex-1 ml-2 mt-2 border border-gray-300 rounded-lg  h-[90.5vh] overflow-hidden">
        {selectedUser ? (
          <>
            <div className="flex-1 overflow-y-auto">
              <ChatList
                selectedUser={selectedUser}
                currentUser={currentUser}
                messages={filteredMessages}
                messagesEndRef={messagesEndRef}
                onClose={() => setSelectedUser(null)}
              />
            </div>
            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
