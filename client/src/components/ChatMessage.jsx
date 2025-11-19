const ChatMessage = ({ text, isSender }) => {
  return (
    <div className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl ${
          isSender ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
