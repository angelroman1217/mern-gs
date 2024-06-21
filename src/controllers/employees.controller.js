import Employees from "../models/employee.model.js";
import redis from "redis";
import { promisify } from "util";

const client = redis.createClient({
  legacyMode: true,
  socket: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost'
  }
});

await client.connect().catch(console.error);

const ASYNC_GET = promisify(client.get).bind(client);
const ASYNC_SET = promisify(client.set).bind(client);
const ASYNC_DEL = promisify(client.del).bind(client);

export const getEmployees = async (req, res) => {
  try {
    const reply = await ASYNC_GET("employees");
    if (reply) {
      return res.json(JSON.parse(reply));
    }
    const employees = await Employees.find().lean();
    await ASYNC_SET("employees", JSON.stringify(employees));
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
    const employees = await Employees.find().lean();
    await ASYNC_SET("employees", JSON.stringify(employees));
    res.json(savedEmployees);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const reply = await ASYNC_GET(req.params.id);
    if (reply) {
      return res.json(JSON.parse(reply));
    }
    const employee = await Employees.findById(req.params.id).lean()
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await ASYNC_SET(req.params.id, JSON.stringify(employee));
    res.json(employee);
  } catch (error) {
    return res.status(404).json({ message: "Employee not found" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const employeeDeleted = await Employees.findByIdAndDelete(req.params.id).lean();
    if (!employeeDeleted)
      return res.status(404).json({ message: "Employee not found" });

    const reply = await ASYNC_GET(req.params.id);
    if (reply) {
      await ASYNC_DEL(req.params.id);
    }

    const employees = await Employees.find().lean();
    await ASYNC_SET("employees", JSON.stringify(employees));
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Employee not found" });
  }
};

export const updateEmployees = async (req, res) => {
  try {
    const employeesUpdated = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).lean();
    if (!employeesUpdated)
      return res.status(404).json({ message: "Employees not found" });

    const reply = await ASYNC_GET(req.params.id);
    if (reply) {
      await ASYNC_DEL(req.params.id);
      await ASYNC_SET(req.params.id, JSON.stringify(employeesUpdated));
    }

    const employees = await Employees.find().lean();
    await ASYNC_SET("employees", JSON.stringify(employees));
    res.json(employeesUpdated);
  } catch (error) {
    return res.status(404).json({ message: "Employee not found" });
  }
};
