import { useState, useEffect } from 'react'
import { useEmployees } from '../context/EmployeesContext'
function EmployeesPage() {
  const { getEmployees, employees } = useEmployees();

  useEffect(() => {
    getEmployees();
  }, [])

  if (employees.length === 0) return(<h1>No hay empleados</h1>)
  return (
    <div>
      {employees.map((employee, i) => (
        <div key={i}>
          <p>{employee.nombre}</p>
          <p>{employee.app}</p>
          <p>{employee.apm}</p>
          <p>{employee.nacimiento}</p>
          <p>{employee.nacionalidad}</p>
          <p>{employee.funciones}</p>
        </div>
      ))}
    </div>
  )
}

export default EmployeesPage