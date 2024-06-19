import { useEffect } from 'react'
import { useEmployees } from '../context/EmployeesContext'
import EmployeeCard from '../components/EmployeeCard';
function EmployeesPage() {
  const { getEmployees, employees } = useEmployees();

  useEffect(() => {
    getEmployees();
  }, [])

  if (employees.length === 0) return(<h1>No hay empleados</h1>)
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2'>
      {employees.map((employee) => (
        <EmployeeCard key={employee._id} employee={employee} />
      ))}
    </div>
  )
}

export default EmployeesPage