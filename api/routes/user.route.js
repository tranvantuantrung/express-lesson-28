const express = require("express");

const controller = require("../controllers/user.controller.js");
const validate = require("../validate/user.validate.js");
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *     - Users
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 */

router.get("/users", controller.getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *     - Users
 *     requestBody:
 *       description: create users
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hieu"
 *               email:
 *                 type: string
 *                 example: "nguyenhieu@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123123"
 *             
 *     responses:
 *       '200':
 *          description: Created
 */

router.post("/users", validate.create, controller.create);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *     - Users
 *     description: remove users
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "id user need delete"
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 */

router.delete("/users/:id", controller.delete);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *     - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "id user need delete"
 *         required: true
 *     requestBody:
 *       description: create users
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hieu"
 *               email:
 *                 type: string
 *                 example: "nguyenhieu@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123123"
 *             
 *     responses:
 *       '200':
 *          description: Created
 */

router.put("/users/:id", controller.update);

module.exports = router;
