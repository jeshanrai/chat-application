import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ onSelectUser }) => {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
       const res = await fetch("http://localhost:5000/api/users", {
  headers: { Authorization: `Bearer ${token}` },
});


        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        // Exclude current logged-in user
        const otherUsers = data.filter(u => u._id !== user._id);
        setUsers(otherUsers);
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUsers();
  }, [token, user]);

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 h-[calc(100vh-71px)] mt-2 bg-white border border-gray-300 p-4 flex flex-col rounded-lg overflow-hidden ml-2  mb-2">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by Username"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none mb-4"
      />

      <h3 className="text-gray-700 font-semibold mb-2">Friends</h3>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto pr-1">
        {loading ? (
          <div className="text-center text-gray-500 text-sm">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">No users found</div>
        ) : (
          filteredUsers.map(u => (
            <div
              key={u._id}
              onClick={() => onSelectUser(u)} // ✅ send selected username to parent
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${u.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className="text-gray-800">{u.username}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
