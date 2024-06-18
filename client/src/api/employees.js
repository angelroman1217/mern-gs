import axios from "./axios";

export const getEmployeesRequest = () => axios.get(`/employees`)

export const getEmployeeRequest = (id) => axios.get(`/employees/${id}`)

export const createEmployeeRequest = (employee) => axios.post(`/employees`, employee)

export const updateEmployeeRequest = (employee) => axios.put(`/employees/${employee._id}`, employee)

export const deleteEmployeeRequest = (id) => axios.delete(`/employees/${id}`)