const express = require("express");

const controller = require("../controllers/transaction.controller.js");

const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     tags:
 *     - Transactions
 *     description: Returns transactions
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 */

router.get("/transactions", controller.getTransactions);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     tags:
 *     - Transactions
 *     requestBody:
 *       description: create Trans
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "5ea5847db896ea17c3c730c2"
 *               bookId:
 *                 type: string
 *                 example: "5ea3d87e77d3df1da5360c9d"
 *     responses:
 *       '200':
 *          description: Created
 */

router.post("/transactions", controller.create);

module.exports = router;
