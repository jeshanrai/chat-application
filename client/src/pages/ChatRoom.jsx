import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatInput from "../components/ChatInput";
import { useState } from "react";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen ml-2 mr-2 mt-2  rounded-lg overflow-hidden ">
      
      {/* Sidebar */}
      <Sidebar onSelectUser={setSelectedUser} />

      {/* Chat Area */}
      <div className="flex flex-col flex-1 ml-2 border border-gray-300 rounded-lg overflow-hidden h-[calc(100vh-71px)]">
        {selectedUser ? (
          <>
            <ChatList
              username={selectedUser}
              onClose={() => setSelectedUser(null)}
            />

            {/* ChatInput only visible when a user is selected */}
            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={() => console.log("send", message)}
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
