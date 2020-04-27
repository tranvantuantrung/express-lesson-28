const express = require("express");

const controller = require("../controllers/book.controller.js");

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags:
 *     - Books
 *     description: Returns books
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 */

router.get("/books", controller.getBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags:
 *     - Books
 *     requestBody:
 *       description: create books
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "FE"
 *               description:
 *                 type: string
 *                 example: "hỗ trợ học FE"
 *             
 *     responses:
 *       '200':
 *          description: Created
 */

router.post("/books", controller.create);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags:
 *     - Books
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

router.delete("/books/:id", controller.delete);

module.exports = router;
