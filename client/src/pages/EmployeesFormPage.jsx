import { useForm } from "react-hook-form";
import { useEmployees } from "../context/EmployeesContext";
import { useState } from "react";
function EmployeesFormPage() {

  const { register, handleSubmit } = useForm();
  const { createEmployees } = useEmployees();

  const [funciones, setFunciones] = useState([]);
  const [oneFuncion, setOneFuncion] = useState("");
  const [funcionesTextArea, setFuncionesTextArea] = useState("");


  const onSubmit = handleSubmit((data) => {
    data.funciones = funciones
    createEmployees(data);
  })

  const addFuncion = () => {
    if (oneFuncion !== "") {
      setFunciones([...funciones, oneFuncion])
      setFuncionesTextArea(funcionesTextArea + "•  " + oneFuncion + "\n")
    }
      setOneFuncion("");
  }

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <p>Nombre:</p>
        <input type="text" placeholder="Nombre" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
          {...register("nombre", { required: true })}
          autoFocus />

        <p>Apellido Paterno:</p>
        <input type="text" placeholder="Apellido Paterno" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
          {...register("app", { required: true })} />

        <p>Apellido Materno:</p>
        <input type="text" placeholder="Apellido Materno" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
          {...register("apm", { required: true })} />

        <p>Fecha de Nacimiento:</p>
        <input type="date" placeholder="Fecha de Nacimiento" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
          {...register("nacimiento", { required: true })} />

        <p>Nacionalidad:</p>
        <input type="text" placeholder="Nacionalidad" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
          {...register("nacionalidad", { required: true })} />

        <p>Funciones:</p>
        <div className="flex w-full justify-between">
          <input type="text" placeholder="Funcion" className="w-5/6 bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
            onChange={(e) => setOneFuncion(e.target.value.trim())} value={oneFuncion}/>

          <button type="button" className="
          text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-4 py-2 text-center mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" 
          onClick={() => addFuncion()}>+</button>

        </div>

        <textarea type="text" rows="5" placeholder="Funciones" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2" disabled value={funcionesTextArea} />

        <button type="submit">Guardar</button>

      </form>
    </div>
  )
}

export default EmployeesFormPage