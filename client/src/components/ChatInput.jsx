const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="p-2 border-t border-gray-300 bg-white flex items-center gap-3">

      

      {/* Input */}
     <input
  type="text"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  placeholder="Type a message..."
  className="flex-1 p-3 bg-gray-100 rounded-full outline-none"
/>


      {/* Send */}
      <button
        onClick={sendMessage}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-500"
      >
        Send
      </button>

    </div>
  );
};

export default ChatInput;
