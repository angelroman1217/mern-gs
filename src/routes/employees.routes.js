import { Router } from "express";
import { getEmployees, getEmployee, createEmployees, updateEmployees, deleteEmployees } from "../controllers/employees.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createEmployeesSchema } from "../schemas/employees.schema.js";

const router = Router();

//Schema
/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *         nombre:
 *           type: string
 *         app:
 *           type: string
 *         apm:
 *           type: string
 *         nacimiento:
 *           type: date
 *         nacionalidad:
 *           type: string
 *         funciones:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - nombre
 *         - app
 *         - apm
 *         - nacimiento
 *         - nacionalidad
 *         - funciones
 *       example:
 *         _id: 123
 *         nombre: John
 *         app: Doe
 *         apm: Smith
 *         nacimiento: 1990-01-01
 *         nacionalidad: USA
 *         funciones: ["funcion1", "funcion2"]
 *   responses:
 *     EmployeeNotFound:
 *       description: Employee not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/employee.model.js'
 *     EmployeeFound:
 *       description: Employee found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/employee.model.js'
 *     EmployeeList:
 *       description: Employee list
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/employee.model.js'
 *     EmployeeCreated:
 *       description: Employee created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/employee.model.js'
 *     EmployeeUpdated:
 *       description: Employee updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/employee.model.js'
 *     EmployeeDeleted:
 *       description: Employee deleted
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/employee.model.js'
 *     EmployeeError:
 *       description: Something went wrong
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/employee.model.js'
 * */


/**
 * @openapi
 * /api/employees:
 *   get:
 *     tags: [employees]
 *     summary: Obtiene todos los empleados
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 * 
 * */

router.get("/employees", authRequired, getEmployees);

/**
 * @openapi
 * /api/employees/:id:
 *  get:
 *     tags: [employees]
 *     summary: Obtiene un solo empleado
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 * */

router.get("/employees/:id", authRequired, getEmployee);

/**
 * @openapi
 * /api/employees:
 *  post:
 *     tags: [employees]
 *     summary: Crea un nuevo empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              nombre:
 *                 type: string
 *              app:
 *                 type: string
 *              apm:
 *                 type: string
 *              nacimiento:
 *                 type: date
 *              nacionalidad:
 *                 type: string
 *              funciones:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *              nombre: John
 *              app: Doe
 *              apm: Smith
 *              nacimiento: 1990-01-01
 *              nacionalidad: USA
 *              funciones: ["funcion1", "funcion2"]
 * */

router.post("/employees", authRequired, validateSchema(createEmployeesSchema), createEmployees);

/**
 * @openapi
 * /api/employees/:id:
 *  delete:
 *     tags: [employees]
 *     summary: Elimina un empleado
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 * */

router.delete("/employees/:id", authRequired, deleteEmployees);

/**
 * @openapi
 * /api/employees/:id:
 *  put:
 *     tags: [employees]
 *     summary: Actualiza un empleado
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/controllers/employees.controller.js'
 * */

router.put("/employees/:id", authRequired, updateEmployees);

export default router;