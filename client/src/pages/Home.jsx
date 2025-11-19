import Sidebar from "../components/Sidebar";
import ChatRoom from "./ChatRoom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
     

      {/* Right Chat Room */}
      <div style={{ flex: 1 }}>
        <ChatRoom />
      </div>
    </div>
  );
};

export default Home;
