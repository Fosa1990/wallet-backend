const sendgridMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDGRID_META_EMAIL } = process.env;

sendgridMail.setApiKey(SENDGRID_API_KEY);

// data = { to, subject, text, html }
const sendEmail = async data => {
  const email = { ...data, from: SENDGRID_META_EMAIL };
  try {
    await sendgridMail.send(email);
    console.log(`Email successfully sent to ${data.to}`);
    return true;
  } catch (error) {
    console.log(`Email not sent to ${data.to}: `, error.message);
    throw error;
  }
};

module.exports = sendEmail;
