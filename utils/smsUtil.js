const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Send SMS via email using SMTP configuration from environment variables
 * @param {string} email - Recipient email address
 * @returns {Promise<void>}
 */
const sendSMS = async (email) => {
  try {

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });



    // Define email message
    const message = {
      from: process.env.SMTP_FROM || 'noreply@example.com',
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Your email is subscribed now.',
      html: '<p>Your email is subscribed now.</p>'
    };

    console.log('message', message)
    // Send email
    await transporter.sendMail(message);
    console.log(`SMS notification sent to ${email}`);
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw new Error('Failed to send email notification');
  }
};

const sendSMSContactFrom = async (email ,name ,projectLocation ,mobile) => {
  try {

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });



    // Define email message
    const message = {
      from: process.env.SMTP_FROM || 'noreply@example.com',
      to: email,
      subject: 'Contact Form Submission Received',
      text: `Dear ${name},\n\nThank you for contacting us. We have received your inquiry regarding the property at ${projectLocation}. Our team will review your message and get back to you shortly at ${mobile}.\n\nBest regards,\nThe Real Estate Team`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Thank You for Contacting Us</h2>
          <p>Dear ${name},</p>
          <p>We have received your inquiry regarding the property at <strong>${projectLocation}</strong>.</p>
          <p>Our team will review your message and get back to you shortly at ${mobile}.</p>
          <br>
          <p>Best regards,</p>
          <p>The Real Estate Team</p>
        </div>
      `
    };

    console.log('message', message)
    // Send email
    await transporter.sendMail(message);
    console.log(`SMS notification sent to ${email}`);
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw new Error('Failed to send email notification');
  }
};

module.exports = { sendSMS ,sendSMSContactFrom };