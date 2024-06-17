import Empleado from "../models/empleado.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";

export const getEmpleados = async (req, res) => {
  const empleados = await Empleado.find().lean();
  res.json(empleados);
}

export const createEmpleados = async (req, res) => {

  const { nombre, app, apm, nacimiento, nacionalidad, funciones } = req.body;
  const newEmpleado = new Empleado({ nombre, app, apm, nacimiento, nacionalidad, funciones, user: req.user.id });
  const savedEmpleado = await newEmpleado.save();
  res.json(savedEmpleado);

}

export const getEmpleado = async (req, res) => {
  const empleado = await Empleado.findById(req.params.id).lean();
  if (!empleado) return res.status(404).json({ message: 'Empleado not found' });
  res.json(empleado);
}

export const deleteEmpleados = async (req, res) => {
  const empleado = await Empleado.findByIdAndDelete(req.params.id).lean();
  if (!empleado) return res.status(404).json({ message: 'Empleado not found' });
  return res.sendStatus(204);

}

export const updateEmpleados = async (req, res) => {
  const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!empleado) return res.status(404).json({ message: 'Empleado not found' });
  res.json(empleado);

}