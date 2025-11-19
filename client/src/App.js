import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRoom from "./pages/ChatRoom";
import AuthProvider from "./context/AuthContext";
import SocketProvider from "./context/SocketContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
