const router = require('express').Router();
const {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
} = require('../../controllers');

const {
  validateAuth,
  validateBody,
  validateParams,
  tryCatchWrapper,
} = require('../../middlewares');

const {
  validationId,
  validationCreateTransaction,
  validationUpdateTransaction,
} = require('../../service/validation');

/**
 * @openapi
 * tags:
 *   name: Transactions
 *   description: End-points for transactions.
 * components:
 *   securitySchemes:
 *     tokenAuth:
 *       name: Authorization token
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - date
 *         - transactionType
 *         - category
 *         - sum
 *         - balance
 *         - owner
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the transaction
 *         transactionType:
 *           type: string
 *           description: The type of the transaction 'income' or 'spend'
 *         date:
 *           type: String
 *           format: date
 *           description: The date of create transaction
 *         sum:
 *           type: Number
 *           description: Sum of income and spend values
 *         balance:
 *           type: Number
 *           description: The user's balance
 *         comment:
 *           type: string
 *           description: The comment to transaction
 *         category:
 *           type: string
 *           description: The category id of transaction
 *         owner:
 *           type: string
 *           description: The owner id of this transaction
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the transaction creation
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the transaction updated
 *       example:
 *         date: "2021-08-23T00:00:00.000+00:00"
 *         transactionType: "spend"
 *         category: "car"
 *         sum: 2000
 *         comment: "some comment"
 *         balance: 9000
 *         owner: 62818a765945edf6a8c38c3c
 *         createdAt: "2022-05-16T00:58:27.446Z"
 *         updatedAt: "2022-05-16T00:58:27.446Z"
 */

// http://localhost:8081/api/transactions
// https://amazing-wallet.herokuapp.com/api/transactions
router
  /**
   * @openapi
   * /api/transactions:
   *   post:
   *     tags: [Transactions]
   *     description: End-point for add new transaction
   *     summary: Add new transaction
   *     security:
   *       - tokenAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               transactionType:
   *                 type: string
   *                 example : income
   *               date:
   *                 type: date
   *                 example : 2022-05-16
   *               sum:
   *                 type: Number
   *                 example : 2000
   *               comment:
   *                 type: string
   *                 example : some coment
   *               category:
   *                 type: string
   *                 example : income
   *     responses:
   *       201:
   *         description: Created
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
   *                   example: 201
   *                 payload:
   *                   type: object
   *                   properties:
   *                     transactionType:
   *                      type: string
   *                      description: Type of transaction 'spend' or 'income'.
   *                      example: spend
   *                     _id:
   *                       type: string
   *                       description: The transaction's id.
   *                       example: 6281a30288b4c62ff15c6f1a
   *                     date:
   *                       type: string
   *                       example : 2022-05-16T00:00:00.000Z
   *                     sum:
   *                       type: Number
   *                       example : 3000
   *                     comment:
   *                       type: string
   *                       example : some coment
   *                     balance:
   *                       type: double
   *                       example: 12000
   *                     category:
   *                       type: string
   *                       example : income
   *                     owner:
   *                       type: string
   *                       example : 62818a765945edf6a8c38c3c
   *                     createdAt:
   *                       type: string
   *                       example : 2022-05-16T01:04:02.006Z
   *                     updatedAt:
   *                       type: string
   *                       example : 2022-05-16T01:04:02.006Z
   *       400:
   *         description: Bad request
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
   *                   example: 400
   *                 message:
   *                   type: string
   *                   description: Service message
   *                   example: Field sum is required
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
  .post(
    '/',
    [validateAuth, validateBody(validationCreateTransaction)],
    tryCatchWrapper(createTransaction),
  );

// http://localhost:8081/api/transactions
// https://amazing-wallet.herokuapp.com/api/transactions
router
  /**
   * @openapi
   * /api/transactions:
   *   get:
   *     tags: [Transactions]
   *     description: Retrieving the list of transactions
   *     summary: Get all transaction.
   *     security:
   *       - tokenAuth: []
   *     parameters: {}
   *     responses:
   *       200:
   *         description: Success
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
   *                     docs:
   *                       type: array
   *                       items:
   *                          type: object
   *                          properties:
   *                             transactionType:
   *                               type: string
   *                               description: Type of transaction 'spend' or 'income'.
   *                               example: income
   *                             _id:
   *                               type: string
   *                               description: The transaction's id.
   *                               example: 62819138bc3b28ea2b17eef9
   *                             date:
   *                               type: string
   *                               example : 2022-10-02T00:00:00.000Z
   *                             sum:
   *                               type: double
   *                               example : 200.75
   *                             balance:
   *                               type: double
   *                               example: 9200.75
   *                             category:
   *                               type: string
   *                               example: "income"
   *                             owner:
   *                               type: object
   *                               properties:
   *                                 _id:
   *                                   type: string
   *                                   example : 62818a765945edf6a8c38c3c
   *                                 name:
   *                                   type: string
   *                                   example : Swagger user
   *                                 email:
   *                                   type: string
   *                                   format: email
   *                                   example : swagger_user@gmail.com
   *                             createdAt:
   *                               type: string
   *                               example : 2022-05-15T23:48:08.550Z
   *                             updatedAt:
   *                               type: string
   *                               example : 2022-05-15T23:48:08.550Z
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
  .get('/', validateAuth, tryCatchWrapper(getAllTransactions));

// http://localhost:8081/api/transactions/transactionId
// https://amazing-wallet.herokuapp.com/api/transactions/transactionId
router
  /**
   * @openapi
   * /api/transactions/{transactionId}:
   *   get:
   *     tags: [Transactions]
   *     description: End-point for get  user's transaction by id
   *     summary: Get transaction by id
   *     security:
   *       - tokenAuth: []
   *     parameters:
   *       - in: path
   *         name: transactionId
   *         required: true
   *         description: Transaction id
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
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
   *                     message:
   *                       type: string
   *                       example: Transaction loaded successfully
   *                     transaction:
   *                       type: object
   *                       properties:
   *                        transactionType:
   *                         type: string
   *                         description: Type of transaction 'spend' or 'income'.
   *                         example: income
   *                        _id:
   *                         type: string
   *                         description: The transaction's id.
   *                         example: 6281a1b3e4373e5be2eef1ef
   *                        date:
   *                         type: string
   *                         example : 2022-10-02T00:00:00.000Z
   *                        sum:
   *                         type: double
   *                         example : 2000
   *                        balance:
   *                         type: double
   *                         example: 11000
   *                        comment:
   *                         type: string
   *                         example: "some comment"
   *                        category:
   *                         type: string
   *                         example: "income"
   *                        owner:
   *                         type: object
   *                         properties:
   *                          _id:
   *                           type: string
   *                           example : 62818a765945edf6a8c38c3c
   *                          name:
   *                           type: string
   *                           example : Swagger user
   *                          email:
   *                           type: string
   *                           format: email
   *                           example : swagger_user@gmail.com
   *                          createdAt:
   *                           type: string
   *                           example : 2022-05-16T00:58:27.446Z
   *                          updatedAt:
   *                           type: string
   *                           example : 2022-05-16T00:58:27.446Z
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
  .get('/:transactionId', validateAuth, tryCatchWrapper(getByIdTransaction));

// http://localhost:8081/api/transactions/transactionId
// https://amazing-wallet.herokuapp.com/api/transactions/transactionId
router
  /**
   * @openapi
   * /api/transactions/{transactionId}:
   *   delete:
   *     tags: [Transactions]
   *     description: End-point to delete transaction by id
   *     summary: Delete transaction by id
   *     security:
   *       - tokenAuth: []
   *     parameters:
   *       - in: path
   *         name: transactionId
   *         required: true
   *         description: Transaction id
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
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
   *                 message:
   *                   type: string
   *                   example: Transaction deleted successfully
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
  .delete('/:transactionId', validateAuth, tryCatchWrapper(deleteTransaction));

// http://localhost:8081/api/transactions/transactionId
// https://amazing-wallet.herokuapp.com/api/transactions/transactionId
router
  /**
   * @openapi
   * /api/transactions/{transactionId}:
   *   put:
   *     tags: [Transactions]
   *     description: End-point for user's transaction update
   *     summary: Update transaction by id
   *     security:
   *       - tokenAuth: []
   *     parameters:
   *       - in: path
   *         name: transactionId
   *         required: true
   *         description: Transaction id
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               sum:
   *                 type: Number
   *                 example : 2000
   *               comment:
   *                 type: string
   *                 example : some coment
   *               category:
   *                 type: string
   *                 example : products
   *     responses:
   *       200:
   *         description: Success
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
   *                     message:
   *                       type: string
   *                       example: Transaction updated successfully
   *                     transaction:
   *                       type: object
   *                       properties:
   *                        transactionType:
   *                         type: string
   *                         description: Type of transaction 'spend' or 'income'.
   *                         example: income
   *                        _id:
   *                         type: string
   *                         description: The transaction's id.
   *                         example: 6281a1b3e4373e5be2eef1ef
   *                        date:
   *                         type: string
   *                         example : 2022-12-22T00:00:00.000Z
   *                        sum:
   *                         type: double
   *                         example : 25000
   *                        balance:
   *                         type: double
   *                         example: 36000
   *                        comment:
   *                         type: string
   *                         example: "some comment"
   *                        category:
   *                         type: string
   *                         example: "income"
   *                        owner:
   *                         type: object
   *                         properties:
   *                          _id:
   *                           type: string
   *                           example : 62818a765945edf6a8c38c3c
   *                          name:
   *                           type: string
   *                           example : Swagger user
   *                          email:
   *                           type: string
   *                           format: email
   *                           example : swagger_user@gmail.com
   *                          createdAt:
   *                           type: string
   *                           example : 2022-05-16T00:58:27.446Z
   *                          updatedAt:
   *                           type: string
   *                           example : 2022-05-16T00:58:27.446Z
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
  .put(
    '/:transactionId',
    [
      validateAuth,
      validateParams(validationId),
      validateBody(validationUpdateTransaction),
    ],
    tryCatchWrapper(updateByIdTransaction),
  );

module.exports = router;
