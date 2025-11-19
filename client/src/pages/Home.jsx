import Sidebar from "../components/Sidebar";
import ChatRoom from "./ChatRoom";

const Home = () => {
  return (
    <div
  style={{
    display: "flex",
    width: "100%",
    height: "89vh", // <-- full viewport height
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
