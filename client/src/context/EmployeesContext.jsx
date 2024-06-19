import { createContext, useContext, useState } from "react";
import { createEmployeeRequest, getEmployeesRequest, getEmployeeRequest, deleteEmployeeRequest, updateEmployeeRequest } from "../api/employees";

const EmployeesContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeesProvider");
  }
  return context;
}

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const res = await getEmployeesRequest();
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createEmployees = async (employee) => {
    try {
      const res = await createEmployeeRequest(employee);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteEmployee = async (id) => {
    try {
      const res = await deleteEmployeeRequest(id);
      if (res.status === 204) setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const getEmployee = async (id) => {
    try {
      const res = await getEmployeeRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const updateEmployee = async (id, employee) => {
    try {
      await updateEmployeeRequest(id, employee);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <EmployeesContext.Provider value={{ employees, createEmployees, getEmployees, getEmployee, deleteEmployee, updateEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
}