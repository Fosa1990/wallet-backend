const router = require('express').Router();
const {
  signup,
  signin,
  signout,
  googleAuth,
  googleRedirect,
} = require('../../controllers');
const {
  validateAuth,
  validateBody,
  tryCatchWrapper,
} = require('../../middlewares');
const {
  validationSignupUser,
  validationSigninUser,
} = require('../../service/validation');

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: End-points for auth.
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
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
 *         balance:
 *           type: number
 *           description: The user's balance
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

// http://localhost:8081/api/auth/signup
router
  /**
   * @openapi
   * /api/auth/signup:
   *   post:
   *     tags: [Auth]
   *     description: End-point for registration of users
   *     summary: Register users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example : testname
   *               email:
   *                 type: string
   *                 example : testemail@gmail.com
   *               password:
   *                 type: string
   *                 example : qwerty
   *               confirmPassword:
   *                 type: string
   *                 example : qwerty
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
   *                   example : created
   *                 code:
   *                   type: number
   *                   example: 201
   *                 payload:
   *                   type: object
   *                   properties:
   *                     user:
   *                       type: object
   *                       properties:
   *                         name:
   *                          type: string
   *                          description: The user's name.
   *                          example: test
   *                         email:
   *                           type: string
   *                           description: The user's email.
   *                           example: test@gmail.com
   *                         balance:
   *                           type: double
   *                           description: The user's balance.
   *                           example: 10000
   *                         avatarURL:
   *                           type: string
   *                           description: The avatar url of the user.
   *                           example: "https://s.gravatar.com/avatar/aaaaabbbbbcccccdddddeeeeefffffgg?s=250"
   *                         isVerified:
   *                           type: bool
   *                           description: Is user verify email?
   *                           example: false
   *                         isInBase:
   *                           type: bool
   *                           description: Is user in db?
   *                           example: false
   *                         verificationToken:
   *                           type: string
   *                           description: The verify token of the user.
   *                           example: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
   *                     message:
   *                       type: string
   *                       description: Service message
   *                       example: User created, please verify your email test@gmail.com
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
   *                   example: Email is required
   *       409:
   *         description: Conflict
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
   *                   example: 409
   *                 message:
   *                   type: string
   *                   description: Service message
   *                   example: User with test@gmail.com already exist
   *       429:
   *         description: Too many request
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
   *                   example: 429
   *                 message:
   *                   type: string
   *                   description: Service message
   *                   example: Too many requests from this IP address, rest a bit (^_^)
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
  .post('/signup', validateBody(validationSignupUser), tryCatchWrapper(signup));

// http://localhost:8081/api/auth/signin
router
  /**
   * @openapi
   * /api/auth/signin:
   *   post:
   *     tags: [Auth]
   *     description: End-point for signin users
   *     summary: Signin users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example : test@gmail.com
   *               password:
   *                 type: string
   *                 example : 12345678
   *     responses:
   *       200:
   *         description: Signin success
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
   *                     token:
   *                       type: string
   *                       description: Token
   *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWRmN2YwMWZiYWI1MWQ3ODZmNDc1NSIsImlhdCI6MTYyOTM3Nzc3NSwiZXhwIjoxNjI5Mzc3Nzc1fQ.ZnzGmtum4XSQ8kAKLxwlETcaMmuOJWZbdM7LUpCYwIw
   *                     user:
   *                       type: object
   *                       properties:
   *                         name:
   *                          type: string
   *                          description: The user's name.
   *                          example: test
   *                         email:
   *                           type: string
   *                           description: The user's email.
   *                           example: test@gmail.com
   *                         balance:
   *                           type: double
   *                           description: The user's balance.
   *                           example: 5000
   *                         avatarURL:
   *                           type: string
   *                           description: The avatar url of the user.
   *                           example: "https://s.gravatar.com/avatar/aaaaabbbbbcccccdddddeeeeefffffgg?s=250"
   *                     message:
   *                       type: string
   *                       description: Service message
   *                       example: Signin successful
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
   *                   example: \"password\" length must be at least 6 characters long
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
   *                   example: Please verify your email or email/password is wrong
   *       429:
   *         description: Too many request
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
   *                   example: 429
   *                 message:
   *                   type: string
   *                   description: Service message
   *                   example: Too many requests from this IP address, rest a bit (^_^)
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
  .post('/signin', validateBody(validationSigninUser), tryCatchWrapper(signin));

// http://localhost:8081/api/auth/signout
router
  /**
   * @openapi
   * /api/auth/signout:
   *   post:
   *     tags: [Auth]
   *     description: End-point for signout users
   *     summary: Signout users
   *     parameters: [{"in": "header", "name": "Authorization", "description": "JWT token", "required": true, "schema": {"type": "string"}}]
   *     security:
   *       - tokenAuth: []
   *     responses:
   *       204:
   *         description: No content.
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
  .get('/signout', validateAuth, tryCatchWrapper(signout));

// http://localhost:8081/api/auth/google
router
  /**
   * @openapi
   * /api/auth/google:
   *   post:
   *     tags: [Auth]
   *     description: Google authentication
   *     summary: Google authentication
   *     responses:
   *       200:
   *         description: Successful operation (redirect to front-end with token in query).
   *         content: {}
   *       403:
   *         description: Not registered or registered with postman
   *         content: {}
   */ .get('/google', tryCatchWrapper(googleAuth));

// http://localhost:8081/api/auth/google-redirect
router.get('/google-redirect', tryCatchWrapper(googleRedirect));

module.exports = router;
