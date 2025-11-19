import React from "react";

const ChatMessage = ({ text, isSender }) => {
  return (
    <div className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] ${
          isSender
            ? "bg-green-200 text-right"
            : "bg-white text-left border border-gray-300"
        }`}
      >
        <p className="break-all whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
