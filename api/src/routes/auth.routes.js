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
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           description: Email del usuario          
 *         password:
 *           type: string
 *           description: Password del usuario
 *         createdAt:
 *           type: date
 *           description: Fecha de creación del usuario (Se genera automaticamente)
 *         updatedAt:
 *           type: date
 *           description: Fecha de actualización del usuario (Se genera automaticamente)
 *       required:
 *         - username
 *         - email
 *         - password
 *       example:
 *         username: user
 *         email: user@example.com
 *         password: string
 */

/**
 * @openapi
 * /api/register:
 *  post:
 *    tags: [User]
 *    summary: Crea un nuevo usuario
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Usuario creado exitosamente e inicia sesion automáticamente
 *      500:
 *        description: Error al registrar
*/
router.post("/register", validateSchema(registerSchema), register);


/**
 * @openapi
 * /api/login:
 *  post:
 *    tags: [User]
 *    summary: Iniciar sesion
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                description: Email del usuario
 *              password:
 *                type: string
 *                format: password
 *                description: Password del usuario
 * 
 *    responses:
 *      200:
 *        description: Inicio de sesion exitóso
 *      400:
 *        description: Usuario inexistente
 *      500:
 *        description: Error al iniciar sesion
*/
router.post("/login", validateSchema(loginSchema), login);


/**
 * @openapi
 * /api/logout:
 *  post:
 *     tags: [User]
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
 *     responses:
 *      200:
 *        description: Cierre de sesión exitoso
*/
router.post("/logout", logout);


/**
 * @openapi
 * /api/verify:
 *  post:
 *     tags: [User]
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
 *     responses:
 *      200:
 *        description: Token verificado y regresa el usuario encontrado
 *      401:
 *        description: Usuario no autorizado
 *      403:
 *        description: Token no verificado
 *      500:
 *        description: Error al verificar
*/
router.post("/verify", authRequired, verifyToken);

export default router;