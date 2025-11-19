import React from "react";

const ChatMessage = ({ text, isSender }) => {
  return (
    <div className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl break-words max-w-[70%] ${
          isSender
            ? "bg-green-200 text-right"
            : "bg-white text-left border border-gray-300"
        }`}
      >
        {text}
        {/* Optional timestamp */}
        {/* <div className="text-xs text-gray-500 mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div> */}
      </div>
    </div>
  );
};

export default ChatMessage;
