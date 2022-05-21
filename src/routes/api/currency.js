const router = require('express').Router();
const { currency } = require('../../controllers/');
const { tryCatchWrapper } = require('../../middlewares');

/**
 * @openapi
 * tags:
 *   name: Currency
 *   description: End-points for currency.
 * components:
 *   schemas:
 *     Currency:
 *       type: array
 *       properties:
 *         ccy:
 *           type: String
 *           description: Currency name 1
 *         base_ccy:
 *           type: String
 *           description: Currency name 2
 *         buy:
 *           type: Number
 *           description: The price at which they buy currency
 *         sale:
 *           type: Number
 *           description: The price at which currency is sold
 *       example: [{"ccy":"USD","base_ccy":"UAH","buy":"31.50000","sale":"32.18000"},{"ccy":"EUR","base_ccy":"UAH","buy":"33.22000","sale":"33.92000"},{"ccy":"BTC","base_ccy":"USD","buy":"27738.8980","sale":"30658.7820"}]
 */

// http://localhost:8081/api/currency
// https://amazing-wallet.herokuapp.com/api/currency
router
  /**
   * @openapi
   * /api/currency:
   *   get:
   *     tags: [Currency]
   *     description: End-point of currency.
   *     summary: Currency
   *     security:
   *       - tokenAuth: []
   *     responses:
   *       200:
   *        description: Success.
   *        content:
   *          application/json:
   *           schema:
   *            type: array
   *            example: [{"ccy":"USD","base_ccy":"UAH","buy":"31.50000","sale":"32.18000"},{"ccy":"EUR","base_ccy":"UAH","buy":"33.22000","sale":"33.92000"},{"ccy":"BTC","base_ccy":"USD","buy":"27738.8980","sale":"30658.7820"}]
   *           properties:
   *            ccy:
   *             type: String
   *             description: Currency 1
   *            base_ccy:
   *             type: String
   *             description: Currency 2
   *            buy:
   *             type: Number
   *             description: The price at which they buy currency
   *            sale:
   *             type: Number
   *             description: The price at which currency is sold
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
  .get('/', tryCatchWrapper(currency));

module.exports = router;
