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
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *         app:
 *           type: string
 *           description: Apellido paterno del empleado
 *         apm:
 *           type: string
 *           description: Apellido materno del empleado
 *         nacimiento:
 *           type: date
 *           description: Fecha de nacimiento del empleado
 *         nacionalidad:
 *           type: string
 *           description: Nacionalidad del empleado
 *         funciones:
 *           type: array
 *           description: Funciones del empleado
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
 *         nombre: John
 *         app: Doe
 *         apm: Smith
 *         nacimiento: 1990-01-01
 *         nacionalidad: USA
 *         funciones: ["funcion1", "funcion2"]
 * */


/**
 * @openapi
 * /api/employees:
 *   get:
 *     tags: [Employee]
 *     summary: Obtiene todos los empleados (Se necesita estar loggeado para su ejecución)
 *     responses:
 *       200:
 *         description: Empleados obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Error al obtener los empleados
 * 
 * */

router.get("/employees", authRequired, getEmployees);

/**
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     tags: [Employee]
 *     summary: Obtiene solo un empleado (Se necesita estar loggeado para su ejecución)
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Empleado no encontrado
 * 
 * */

router.get("/employees/:id", authRequired, getEmployee);

/**
 * @openapi
 * /api/employees:
 *  post:
 *     tags: [Employee]
 *     summary: Crea un nuevo empleado (Se necesita estar loggeado para su ejecución)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Empleado creado exitosamente
 *       500:
 *         description: Error al registrar
 * */

router.post("/employees", authRequired, validateSchema(createEmployeesSchema), createEmployees);

/**
 * @openapi
 * /api/employees/{id}:
 *   delete:
 *     tags: [Employee]
 *     summary: Elimina un empleado (Se necesita estar loggeado para su ejecución)
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID del empleado
 *     responses:
 *       204:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 * 
 * */

router.delete("/employees/:id", authRequired, deleteEmployees);

/**
 * @openapi
 * /api/employees/{id}:
 *   put:
 *     tags: [Employee]
 *     summary: Actualiza un empleado (Se necesita estar loggeado para su ejecución)
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       404:
 *         description: Empleado no encontrado
 * 
 * */

router.put("/employees/:id", authRequired, updateEmployees);

export default router;