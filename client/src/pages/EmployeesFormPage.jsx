import { useForm } from "react-hook-form";
import { useEmployees } from "../context/EmployeesContext";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EmployeesFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createEmployees, getEmployee, updateEmployee } = useEmployees();

  const [funciones, setFunciones] = useState([]);
  const [oneFuncion, setOneFuncion] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const dateFormat = (date) => {
    const dateSdatering = new Date(date).toISOString().split("T")[0];
    const [year, month, day] = dateSdatering.split("-");
    const dayS = parseInt(day).toString().padStart(2, "0");
    return `${year}-${month}-${dayS}`;
  };

  useEffect(() => {
    async function loadEmployee() {
      if (params.id) {
        const employee = await getEmployee(params.id);
        setValue("nombre", employee.nombre);
        setValue("app", employee.app);
        setValue("apm", employee.apm);
        setValue("nacimiento", dateFormat(employee.nacimiento));
        setValue("nacionalidad", employee.nacionalidad);
        if (employee.funciones.length > 0) {
          setFunciones(employee.funciones);
        }
      }
    }
    loadEmployee();
  }, []);

  const onSubmit = handleSubmit(async(data) => {
    data.funciones = funciones;
    if (params.id) {
      await updateEmployee(params.id, data);
    } else {
      await createEmployees(data);
    }
    navigate("/employees");
  });

  const addFuncion = () => {
    if (oneFuncion !== "") {
      setFunciones([...funciones, oneFuncion]);
    }
    setOneFuncion("");
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className={`bg-zinc-800 ${funciones.length == 0 ? "max-w-md" : ""} w-full p-10 rounded-md flex justify-between`}>
        <form onSubmit={onSubmit} className= {`${funciones.length > 0 ? "w-1/2" : "w-full"}`}>
          <p>Nombre:</p>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register("nombre", { required: true })}
            autoFocus
          />

          <p>Apellido Paterno:</p>
          <input
            type="text"
            placeholder="Apellido Paterno"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register("app", { required: true })}
          />

          <p>Apellido Materno:</p>
          <input
            type="text"
            placeholder="Apellido Materno"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register("apm", { required: true })}
          />

          <p>Fecha de Nacimiento:</p>
          <input
            type="date"
            placeholder="Fecha de Nacimiento"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register("nacimiento", { required: true })}
          />

          <p>Nacionalidad:</p>
          <input
            type="text"
            placeholder="Nacionalidad"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
            {...register("nacionalidad", { required: true })}
          />

          <p>Funciones:</p>
          <div className="flex w-full  pb-2">
            <input
              type="text"
              placeholder="Funcion"
              className={`${funciones.length != 0 ? "w-[93%]" : "w-[85%]"} bg-zinc-700 text-white px-4 py-2 mr-2 rounded-md mb-2`}
              onChange={(e) => setOneFuncion(e.target.value.trim())}
              value={oneFuncion}
            />

            <button
              type="button"
              className={`${funciones.length != 0 ? "w-[7%]" : "w-[15%]"} text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-4 py-2 text-center mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800`}
            
              onClick={() => addFuncion()}
            >
              +
            </button>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
        </form>
        {funciones.length > 0 && (
          <div className="bg-zinc-800 w-1/2 p-10 rounded-md">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-72">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 top-0 sticky">
                  <tr>
                    <th
                      scope="col"
                      className="border-r px-6 py-2 dark:border-neutral-500 w-11/12"
                    >
                      Funciones
                    </th>
                    <th
                      scope="col"
                      className="border-r px-4 py-2 dark:border-neutral-500"
                    >
                      Borrar
                    </th>
                  </tr>
                </thead>
                <tbody className=" overflow-y-auto">
                  {funciones.map((funcion, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                        <span className="font-bold pr-3">•</span>{funcion}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500 flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setFunciones(funciones.filter((f) => f !== funcion));
                          }}
                        >
                          <svg
                            className="w-3 h-3 text-red-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeesFormPage;
