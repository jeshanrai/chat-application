// src/components/ChatList.jsx
import React, { useEffect, useRef } from "react";

const ChatList = ({ selectedUser, messages = [], currentUser, onClose }) => {
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) return null; // Handle null user

  return (
    <div className="flex flex-col flex-1 h-full">

      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{selectedUser.username}</span>
          <span
            className={`h-2 w-2 rounded-full ${
              selectedUser.online ? "bg-green-400" : "bg-gray-400"
            }`}
          ></span>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-green-700 px-2 py-1 rounded"
        >
          ❌
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-blue-50 p-4 flex flex-col gap-2">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center mt-4">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isSender = msg.senderId === currentUser._id;
            return (
              <div
                key={msg._id || msg.timestamp}
                className={`max-w-[70%] px-3 py-2 rounded-lg break-words ${
                  isSender
                    ? "bg-green-200 self-end text-right"
                    : "bg-white self-start text-left"
                }`}
              >
                {msg.text}
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} /> {/* Anchor for auto-scroll */}
      </div>
    </div>
  );
};

export default ChatList;
