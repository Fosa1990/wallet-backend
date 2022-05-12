// Responses AUTH
const signup = {
  status: 'created',
  code: 201,
  payload: {
    user: {
      name: 'test user one',
      email: 'golaj76460@angeleslid.com',
      avatarURL: 'https://...avatar url',
      isVerified: false,
      verificationToken: 'verification token',
    },
  },
};

const signin = {
  status: 'success',
  code: 200,
  payload: {
    token: 'token',
    user: {
      name: 'test user one',
      email: 'golaj76460@angeleslid.com',
      avatarURL: 'https://...avatar url',
    },
  },
};

const signout = null; // 204 status code - No Content

// Responses USER
const current = {
  status: 'success',
  code: 200,
  payload: {
    user: {
      name: 'test user one',
      email: 'golaj76460@angeleslid.com',
      subscription: 'starter',
      avatarURL: 'https://...avatar url',
    },
  },
};

const verify = {
  status: 'success',
  code: 200,
  payload: {
    message: 'User: test user one successfully verified',
  },
};

// Responses TRANSACTION
const addTransaction = {
  status: 'success',
  code: 201,
  payload: {
    contact: {
      name: 'rabbit',
      email: 'test@gamil.com',
      phone: '123456789',
      favorite: true,
      owner: 'id',
      _id: 'id',
      createdAt: 'time',
      updatedAt: 'time',
    },
  },
};

// TODO:
// JWT_EXPIRED
const jwtexpired = {
  status: 401,
  code: 401,
  payload: {
    message: 'jwt expired',
  },
};

module.exports = {
  signup,
  signin,
  signout,
  current,
  verify,
  jwtexpired,
  addTransaction,
};
