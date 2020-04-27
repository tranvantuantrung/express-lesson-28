const express = require("express");

const controller = require("../controllers/login.controller.js");

const router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *     - Login
 *     requestBody:
 *       description: login app
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "nguyenhieu@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123123"
 *             
 *     responses:
 *       '200':
 *          description: login...
 */

router.post("/login", controller.postLogin);

module.exports = router;
