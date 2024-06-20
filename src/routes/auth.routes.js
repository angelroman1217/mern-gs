import { Router } from "express";
import { login, register, logout, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

//Schema
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *       required:
 *         - username
 *         - email
 *         - password
 *       example:
 *         _id: 123
 *         username: John
 *         email: 2Hb6H@example.com
 *         password: john123
 *         createdAt: 2022-01-01
 *         updatedAt: 2022-01-01
 *   responses:
 *     200:
 *       description: Crea un nuevo usuario
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/user.model.js'
 *     400:
 *       description: El usuario ya existe

 */


/**
 * @openapi
 * /api/register:
 *  post:
 *     tags: [auth]
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
*/
router.post("/register", validateSchema(registerSchema), register);


/**
 * @openapi
 * /api/login:
 *  post:
 *     tags: [auth]
 *     summary: Iniciar sesion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
*/
router.post("/login", validateSchema(loginSchema), login);


/**
 * @openapi
 * /api/logout:
 *  post:
 *     tags: [auth]
 *     summary: Cierre de sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 format: token
*/
router.post("/logout", logout);


/**
 * @openapi
 * /api/verify:
 *  post:
 *     tags: [auth]
 *     summary: Verifica el token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 format: token
*/
router.post("/verify", authRequired, verifyToken);

export default router;