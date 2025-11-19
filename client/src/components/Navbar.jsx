import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call your auth hook's logout
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="w-full bg-[#f5f5f5] border-b border-gray-300">
      <div className="flex items-center justify-between py-3 px-10 max-w-full mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition"
        >
          ChatApp
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!user && (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-md bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition text-sm"
            >
              Login
            </Link>
          )}

          {user && (
            <>
              <span className="text-gray-700 text-sm">{user.username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-400 transition text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
