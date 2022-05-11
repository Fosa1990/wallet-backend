const { PORT } = require('../../helpers/constants.js');

const emailConfig = async (name, email, verificationToken) => {
  const htmlTemplate = `
  <h1>Hi ${name}!</h1>
  <p>You need to confirm your email to access the contact service.</p>
  <br/>
  <p>If you have any questions/issues regarding the process, feel free to <a target="_blank" rel="noopener noreferrer" href="mailto:fosa1990@meta.ua">contact me.</a></p>
  <br/>
  <p>To verify your email: <b>${email}</b> <a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Click here</a>. Thank you :)</p>
  <br/>
  <p>Glad to see you on my:&nbsp;
  <a target="_blank" rel="noopener noreferrer" href="https://github.com/Fosa1990">Github</a>&nbsp;
  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/fosa1990/">LinkedIn</a>
  </p>
  <br/>
  <p>With Regards,</p>
  <h4>Anatoliy Sulypa</h4>
  `;

  // emailConfig = { to, subject, text, html };
  const config = {
    to: email,
    subject: 'Confirm email in "Contacts Service"',
    text: `Please verify your email: ${email}`,
    html: htmlTemplate,
  };

  return config;
};

module.exports = emailConfig;
