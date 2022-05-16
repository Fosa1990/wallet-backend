const router = require('express').Router();
const { current, reVerify, verifyEmail, avatar } = require('../../controllers');
const {
  validateAuth,
  validateBody,
  tryCatchWrapper,
} = require('../../middlewares');
const { validationEmail } = require('../../service/validation');

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: End-points for users.
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         confirmPassword:
 *           type: string
 *           description: The password of the user
 *         isVerified:
 *           type: boolean
 *           description: Is user verify email?
 *         verificationToken:
 *           type: string
 *           description: The verify token of the user
 *         avatarURL:
 *           type: string
 *           description: The avatar url of the user
 *       example:
 *         name: test
 *         email: test@gmail.com
 *         password: qwerty
 *         isVerified: false
 *         verificationToken: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
 *         avatarURL: "https://s.gravatar.com/avatar/aaaaabbbbbcccccdddddeeeeefffffgg?s=250"
 */

// http://localhost:8081/api/users/current
router
  /**
   * @openapi
   * /api/users/current:
   *   get:
   *     tags: [Users]
   *     summary: Current users
   *     description: Retrieving data of the current user
   *     security:
   *       - tokenAuth: []
   *     responses:
   *       200:
   *         description: Сurrent user data
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
   *                     id:
   *                       type: double
   *                       description: The user ID.
   *                       example: 0
   *                     name:
   *                       type: string
   *                       description: The user's name
   *                       example: Name
   *                     email:
   *                       type: string
   *                       description: The user's email
   *                       example: test@gmail.com
   *                     balance:
   *                       type: double
   *                       description: The user's balance
   *                       example: 0.00
   *                     message:
   *                       type: string
   *                       description: Service message
   *                       example: Current user
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
  .get('/current', validateAuth, tryCatchWrapper(current));

// http://localhost:8081/api/users/avatar
router.patch('/avatar', tryCatchWrapper(avatar));

// http://localhost:8081/api/users/verify
router.post(
  '/verify',
  validateBody(validationEmail),
  tryCatchWrapper(reVerify),
);

// http://localhost:8081/api/users/verify/:verificationToken
router
  /**
   * @openapi
   * /api/users/verify/:verificationToken:
   *   get:
   *     tags: [Users]
   *     description: End-point for verification email. After successful verification redirect for login page
   *     summary: Verification email.
   *     responses:
   *       404:
   *          description: User not found.
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
   *                 data:
   *                   type: string
   *                   description: Service message
   *                   example: Internal Server Error
   */
  .get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));

module.exports = router;
