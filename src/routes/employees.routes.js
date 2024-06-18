import { Router } from "express";
import { getEmployees, getEmployee, createEmployees, updateEmployees, deleteEmployees } from "../controllers/employees.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createEmployeesSchema } from "../schemas/employees.schema.js";

const router = Router();


router.get("/employees", authRequired, getEmployees);
router.get("/employees/:id", authRequired, getEmployee);
router.post("/employees", authRequired, validateSchema(createEmployeesSchema), createEmployees);
router.delete("/employees/:id", authRequired, deleteEmployees);
router.put("/employees/:id", authRequired, updateEmployees);

export default router;