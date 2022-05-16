const { PORT } = require('../../helpers/constants.js');
const { HEROKU_HOST } = process.env;
const emailConfig = async (name, email, verificationToken) => {
  const htmlTemplate = `
  <h1>Hi ${name}!</h1>
  <p>You need to confirm your email to access the Amazing Wallet</p>
  <br/>
  <p>If you have any questions/issues regarding the process, feel free to <a target="_blank" rel="noopener noreferrer" href="mailto:fosa1990@meta.ua">contact me.</a></p>
  <br/>
  <p>To verify your email with Heroku: <b>${email}</b> <a target="_blank" href="${HEROKU_HOST}/api/users/verify/${verificationToken}">Click here</a>. Thank you (^_^)</p>
  <br/>
  <p>To verify your email with Localhost: <b>${email}</b> <a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Click here</a>. Thank you (^_^)</p>
  <br/>
  <p>Glad to see you on our:&nbsp;
  <a target="_blank" rel="noopener noreferrer" href="https://amazing-wallet.netlify.app/">Live Page</a>&nbsp;
  <a target="_blank" rel="noopener noreferrer" href="https://github.com/Fosa1990/wallet-frontend">Github</a>&nbsp;
  </p>
  <br/>
  <p>With Regards,</p>
  <h4>Amazing Wallet team</h4>
  `;

  // emailConfig = { to, subject, text, html };
  const config = {
    to: email,
    subject: 'Confirm email in "Amazing Wallet"',
    text: `Please verify your email: ${email}`,
    html: htmlTemplate,
  };

  return config;
};

module.exports = emailConfig;
