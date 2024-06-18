import Employees from "../models/employee.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";

export const getEmployees = async (req, res) => {
  const employees = await Employees.find().lean();
  res.json(employees);
}

export const createEmployees = async (req, res) => {

  const { nombre, app, apm, nacimiento, nacionalidad, funciones } = req.body;
  const newEmployees = new Employees({ nombre, app, apm, nacimiento, nacionalidad, funciones, user: req.user.id });
  const savedEmployees = await newEmployees.save();
  res.json(savedEmployees);

}

export const getEmployee = async (req, res) => {
  const employees = await Employees.findById(req.params.id).lean();
  if (!employees) return res.status(404).json({ message: 'Employees not found' });
  res.json(employees);
}

export const deleteEmployees = async (req, res) => {
  const employees = await Employees.findByIdAndDelete(req.params.id).lean();
  if (!employees) return res.status(404).json({ message: 'Employees not found' });
  return res.sendStatus(204);

}

export const updateEmployees = async (req, res) => {
  const employees = await Employees.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!employees) return res.status(404).json({ message: 'Employees not found' });
  res.json(employees);

}