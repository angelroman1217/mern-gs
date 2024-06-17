import { Router } from "express";
import { getEmpleados, getEmpleado, createEmpleados, updateEmpleados, deleteEmpleados } from "../controllers/empleados.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createEmpleadosSchema } from "../schemas/empleados.schema.js";

const router = Router();


router.get("/empleados", authRequired, getEmpleados);
router.get("/empleados/:id", authRequired, getEmpleado);
router.post("/empleados", authRequired, validateSchema(createEmpleadosSchema), createEmpleados);
router.delete("/empleados/:id", authRequired, deleteEmpleados);
router.put("/empleados/:id", authRequired, updateEmpleados);

export default router;