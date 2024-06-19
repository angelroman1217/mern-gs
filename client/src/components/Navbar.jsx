import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">Employees Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome {user.username}
            </li>
            <li>
              <Link to="/add-employees" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">Employees</Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
