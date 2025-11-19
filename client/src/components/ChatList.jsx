import React, { useEffect, useRef } from "react";

const ChatList = ({ selectedUser, messages, currentUser, onClose }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/*  HEADER */}
      <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg flex-shrink-0">
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

      {/* SCROLLABLE MESSAGES */}
      <div className="flex-1 overflow-y-auto bg-blue-50 p-4 flex flex-col gap-2">
        {messages.map((msg) => {
          const isSender = msg.senderId === currentUser._id;

          return (
            <div
              key={msg._id}
              className={`max-w-[70%] px-3 py-2 rounded-lg ${
                isSender ? "bg-green-200 self-end" : "bg-white self-start border border-gray-300"
              }`}
            >
              
              <p className="break-all whitespace-pre-wrap">{msg.text}</p>

              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
            </div>
          );
        })}

        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatList;
