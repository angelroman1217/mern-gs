import Employees from "../models/employee.model.js";
import { createClient } from "redis";

var obj = {};
if (process.env.REDIS_URL) {
  obj = {
    url: process.env.REDIS_URL
  }
} else {
  obj = {
    host: 'localhost',
    port: 6379
  }
}

const client = createClient(obj);

client.on('error', (err) => {
  console.error('Redis error:', err);
});

(async () => {
  await client.connect();
})();


export const getEmployees = async (req, res) => {
  try {
    const reply = await client.get("employees");
    if (reply) {
      return res.json(JSON.parse(reply));
    }
    const employees = await Employees.find().lean();
    await client.set("employees", JSON.stringify(employees));
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
    await client.set("employees", JSON.stringify(employees));
    res.json(savedEmployees);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const reply = await client.get(req.params.id);
    if (reply) {
      return res.json(JSON.parse(reply));
    }
    const employee = await Employees.findById(req.params.id).lean()
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await client.set(req.params.id, JSON.stringify(employee));
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

    const reply = await client.get(req.params.id);
    if (reply) {
      await client.del(req.params.id);
    }

    const employees = await Employees.find().lean();
    await client.set("employees", JSON.stringify(employees));
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

    const reply = await client.get(req.params.id);
    if (reply) {
      await client.del(req.params.id);
      await client.set(req.params.id, JSON.stringify(employeesUpdated));
    }

    const employees = await Employees.find().lean();
    await client.set("employees", JSON.stringify(employees));
    res.json(employeesUpdated);
  } catch (error) {
    return res.status(404).json({ message: "Employee not found" });
  }
};
