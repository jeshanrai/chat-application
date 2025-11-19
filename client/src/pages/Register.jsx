
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");// to differentiate message type
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // For redirect after success

  const handleRegister = async () => {
    // Basic validation
    if (!username || !email || !password) {
      setMessage("All fields are required!");
      setType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Redirecting to login...");
        // Clear fields
        setUsername("");
        setType("success");
        setEmail("");
        setPassword("");

        // Redirect to login after 1.5 seconds
        setTimeout(() => navigate("/login"), 1500);
      } else {
        // Backend returned an error
        setMessage(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        
        {/* Message */}
       {message && (
  <p
    className={`text-center text-sm mt-4 ${
      type === "success" ? "text-green-600" : "text-red-600"
    }`}
  >
    {message}
  </p>
)}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Register
        </button>


        {/* Already have account */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
