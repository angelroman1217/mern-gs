import { createContext, useContext, useState } from "react";
import { createEmployeeRequest, getEmployeesRequest } from "../api/employees";

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

  return (
    <EmployeesContext.Provider value={{ employees, createEmployees, getEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
}