import Employees from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employees.find().lean();
    res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { nombre, app, apm, nacimiento, nacionalidad, funciones } = req.body;
    const newEmployees = new Employees({
      nombre,
      app,
      apm,
      nacimiento,
      nacionalidad,
      funciones,
      user: req.user.id,
    });
    const savedEmployees = await newEmployees.save();
    res.json(savedEmployees);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employees.findById(req.params.id).lean();
    if (!employees)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employees);
  } catch (error) {
    return res.status(404).json({ message: "Employee not found" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const employees = await Employees.findByIdAndDelete(req.params.id).lean();
    if (!employees)
      return res.status(404).json({ message: "Employee not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Employee not found" });
  }
};

export const updateEmployees = async (req, res) => {
  try {
    const employees = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).lean();
    if (!employees)
      return res.status(404).json({ message: "Employees not found" });
    res.json(employees);
  } catch (error) {
    return res.status(404).json({ message: "Employee not found" });
  }
};
