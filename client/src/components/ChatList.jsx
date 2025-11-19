const ChatList = ({ username, onClose }) => {
  return (
    <div className="flex flex-col flex-1">

      {/* Chat Header */}
     <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg ">

        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="text-green-600"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>

          <span className="font-semibold">{username}</span>
          <span className="h-2 w-2 bg-green-400 rounded-full"></span>
        </div>

        {/* Close */}
        <button onClick={onClose}>
          ❌
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-blue-50 p-4">
        {/* Render messages here */}
      </div>
    </div>
  );
};

export default ChatList;
