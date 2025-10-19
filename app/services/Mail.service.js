const nodemailer = require("nodemailer");
const logger = require("../utils/Logger");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendMail = async (to, subject, text, html, context = {}) => {
  logger.info(`Sending email to ${to} with subject ${subject}`);
  try {
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_FROM}`,
      to: to,
      subject: subject,
      text: text,
      html: html,
      context: {
        // Ajoutez ici les variables que vous souhaitez utiliser dans le template
        ...context
      }
    });
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error}`);
    throw error;
  }
}

module.exports = {
  sendMail,
};