const queryString = require('query-string');
const axios = require('axios');
const { User } = require('../../models');
const generator = require('generate-password');

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
  HEROKU_HOST,
  /* FRONTEND_URL, */
} = process.env;

// http://localhost:8081/api/auth/google-redirect
const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  const { email } = userData.data;
  const userExist = await User.findOne({ email });

  if (!userExist) {
    const password = generator.generate({
      length: 16,
      numbers: true,
    });
    const newUser = new User({
      name: userData.data.given_name,
      email: userData.data.email,
      password,
      avatarURL: userData.data.picture,
    });
    newUser.verifyUser(true);
    newUser.verifyToken(null);
    newUser.setHashPassword(password);
    newUser.setToken();
    await newUser.save();
    return res.redirect(`${HEROKU_HOST}/dashboard?token=${newUser.token}`);
  }

  await userExist.setToken();
  await userExist.save();
  // TODO: add redirect to dashboard frontend page
  // return res.redirect(`${FRONTEND_URL}/dashboard?token=${userExist.token}`);
  return res.redirect(`${HEROKU_HOST}/dashboard?token=${userExist.token}`);
};

module.exports = googleRedirect;
