const router = require('express').Router();
const { getAllCategories } = require('../../controllers');
const { validateAuth, tryCatchWrapper } = require('../../middlewares');

/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: End-point for categories.
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       required:
 *         - _id
 *       properties:
 *         _id:
 *           type: string
 *           description: Enumerable category.
 *       example:
 *         _id: basic spend, products, car, household products, self care, child care, education, leisure, other spend, income,
 */

// http://localhost:8081/api/categories?year=2022&month=10
// https://amazing-wallet.herokuapp.com/api/categories?year=2022&month=10
router
  /**
   * @openapi
   * /api/categories:
   *   get:
   *     tags: [Categories]
   *     summary: Current categories
   *     description: Retrieving data of a categories
   *     security:
   *       - tokenAuth: []
   *     parameters:
   *       - in: query
   *         name: year
   *         description: Year of transaction
   *         schema:
   *           type: string
   *       - in: query
   *         name: month
   *         description: Month of transaction
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Сurrent categories data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example : success
   *                 code:
   *                   type: number
   *                   example: 200
   *                 payload:
   *                   type: object
   *                   properties:
   *                     categories:
   *                       type: Array
   *                       description: Array of categories.
   *                       example: ["transactionType" : [{"_id" : "spend","totalSum" : 1111}],{"category" : [{"_id" : "income","totalSum" : 1111}]}]
   *                     message:
   *                       type: string
   *                       description: Service message
   *                       example: Current categories data
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example : error
   *                 code:
   *                   type: number
   *                   example: 401
   *                 message:
   *                   type: string
   *                   description: Service message
   *                   example: Not authorized
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example : fail
   *                 code:
   *                   type: number
   *                   example: 500
   *                 message:
   *                   type: string
   *                   description: Service message
   *                   example: Internal Server Error
   *                 payload:
   *                   type: string
   *                   description: Service message
   *                   example: Internal Server Error
   */
  .get('/', validateAuth, tryCatchWrapper(getAllCategories));

module.exports = router;
