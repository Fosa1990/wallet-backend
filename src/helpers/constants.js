const PORT = process.env.PORT || 8081;

const USER_LIMIT = {
  NAME: { MIN: 1, MAX: 12 },
  EMAIL: { MIN: 10, MAX: 63 },
  PASSWORD: { MIN: 6, MAX: 16 },
};

const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

const STATUS = {
  OK: 'ok',
  CREATED: 'created',
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};

const MESSAGE = {
  INVALID_SIGNATURE: 'invalid signature',
  NOT_AUTHORIZED: 'Not authorized',
  NOT_FOUND: 'Not found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  TOO_MANY_REQUESTS: 'Too many requests from this IP address, rest a bit (^_^)',
  BEARER: 'Bearer',
  JWT_EXPIRED: 'jwt expired',
  REVERIFY_FAIL: 'Verification has already been passed',
  TOOLTIP_ROUTES:
    "Use routes: '/api/auth/' or '/api/users/' or '/api/categories/' or '/api/transactions' ...",
  USER_CREATED: 'User created, please verify your email',
  USER_SIGNIN: 'Signin successful',
  USER_SIGNOUT: 'Signout successful',
  USER_CURRENT: 'Current user',
  SIGNIN_FAILED: 'Please verify your email or email/password is wrong',
  CREATED_SUCCESSFUL: 'Created successful',
  LOADED_SUCCESSFUL: 'Loaded successful',
  DELETED_SUCCESSFUL: 'Deleted successful',
  UPDATED_SUCCESSFUL: 'Updated successful',
};

const FILE_SIZE = {
  HALFMB: 524288,
  ONEMB: 1048576,
  TWOMB: 2097152,
  THREEMB: 3145728,
  FOURMB: 4194304,
  FIVEMB: 5242880,
};

module.exports = {
  PORT,
  HTTP_CODE,
  STATUS,
  MESSAGE,
  FILE_SIZE,
  USER_LIMIT,
};
