// Responses AUTH
const signup = {
  status: 'created',
  code: 201,
  payload: {
    user: {
      name: 'test user one',
      email: 'golaj76460@angeleslid.com',
      avatarURL:
        'https://s.gravatar.com/avatar/3b92774e43da3a6c9186bb1cc66b0705?s=250',
      isVerified: false,
      verificationToken: '839dc6d4-ce8e-4f97-9f00-d46be76dd645',
    },
  },
};

const signin = {
  status: 'success',
  code: 200,
  payload: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2M1ZGUzYjVkYmUxNjcxZjI5ZTdhYiIsImlhdCI6MTY1MjMxNzkxNywiZXhwIjoxNjUyMzIxNTE3fQ.xod3SZtBSzHAEcqPYABmFMTLQx7nH9_ZKtRsDW8BbbM',
    user: {
      name: 'test user one',
      email: 'golaj76460@angeleslid.com',
      avatarURL:
        'https://s.gravatar.com/avatar/3b92774e43da3a6c9186bb1cc66b0705?s=250',
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
      avatarURL:
        'https://s.gravatar.com/avatar/3b92774e43da3a6c9186bb1cc66b0705?s=250',
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
      email: '23rabbit@gamil.com',
      phone: '55000000',
      favorite: true,
      owner: '627c5de3b5dbe1671f29e7ab',
      _id: '627c60e4b5dbe1671f29e7b8',
      createdAt: '2022-05-12T01:20:36.052Z',
      updatedAt: '2022-05-12T01:20:36.052Z',
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
