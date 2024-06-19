import dayjs from "dayjs";
import { useEmployees } from "../context/EmployeesContext";
import { Link } from "react-router-dom";
function EmployeeCard({ employee }) {
  const { deleteEmployee } = useEmployees();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">
          {employee.nombre} {employee.app} {employee.apm}
        </h1>
        <div className="flex gap-x-2 items-center">
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => deleteEmployee(employee._id)}>delete</button>
          <Link to={`/employees/${employee._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded">edit</Link>
        </div>
      </header>
      <p>
        <span className="font-bold">Fecha de Nacimiento:</span>{" "}
        {dayjs(employee.nacimiento).add(1, "day").format("DD/MM/YYYY")}
      </p>
      <p>
        <span className="font-bold">Nacionalidad:</span> {employee.nacionalidad}
      </p>
      <p>
        <span className="font-bold">Funciones: </span>
        <span className="pl-1 py-0">
          {employee.funciones.length === 0
            ? <span className="text-red-500">No tiene funciones</span>
            : employee.funciones.map((funcion, i) => (
                <span key={i}>
                  {funcion}
                  {i !== employee.funciones.length - 1 ? ", " : "."}
                </span>
              ))}
        </span>
      </p>
    </div>
  );
}

export default EmployeeCard;
