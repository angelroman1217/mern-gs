import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(user);

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={
        isAuthenticated ? "/employees" : "/"
      }>
        <h1 className="text-2xl font-bold">Gestor de Empleados</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido:  {user.username}
            </li>
            <li>
              <Link to="/add-employees" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">+ Agregar Usuarios</Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>Salir</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
