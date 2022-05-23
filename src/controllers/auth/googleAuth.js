const queryString = require('query-string');
const {
  GOOGLE_CLIENT_ID,
  HEROKU_HOST,
  // PORT,
  // BASE_URL,
  // LOCAL_3000,
  // FRONTEND_URL
} = process.env;

// https://amazing-wallet.herokuapp.com/api/auth/google
const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    // redirect_uri: `${BASE_URL}${PORT}/api/auth/google-redirect`,
    redirect_uri: `${HEROKU_HOST}/api/auth/google-redirect`,
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
