const queryString = require('query-string');
const { PORT } = require('../../helpers/constants');
const { GOOGLE_CLIENT_ID, BASE_URL } = process.env;

// http://localhost:8081/api/auth/google
const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}${PORT}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  );
};

module.exports = googleAuth;
