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
  console.log('sendSMS email', email)
  try {
  
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: Number(process.env.SMTP_PORT), 
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, 
  },
});



    // Define email message
    const message = {
      from: process.env.SMTP_FROM || 'noreply@example.com',
      to: [
    process.env.SMTP_FROM, 
    'sadiqrashmigroup@gmail.com'
  ],
      subject: 'New Subscription Alert',
      text: `New Subscription Alert\n\nSubscriber Details:\nEmail: ${email}\n\nA new subscriber has joined your mailing list. You may want to welcome them or add them to your subscriber management system.\n\nThis is an automated notification from your subscription system.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Subscription Alert</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Subscriber Details:</h3>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <p style="color: #666; line-height: 1.6;">A new subscriber has joined your mailing list. You may want to welcome them or add them to your subscriber management system.</p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px;">This is an automated notification from your subscription system.</p>
          </div>
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

const sendSMSContactFrom = async (email ,name ,projectLocation ,mobile ,messageData) => {
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
   to: [
    process.env.SMTP_FROM, 
    'sadiqrashmigroup@gmail.com'
  ],
      subject: 'Contact Form Submission Received',
      text: `New Contact Form Submission\n\nContact Details:\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nProperty Location: ${projectLocation}\n\nA new inquiry has been received from the contact form. Please review and follow up with the client as soon as possible.\n\nThis is an automated message from your website's contact form system.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Property Location:</strong> ${projectLocation}</p>
            <p><strong>Message:</strong> ${messageData}</p>
          </div>

          <p style="color: #666; line-height: 1.6;">A new inquiry has been received from the contact form. Please review and follow up with the client as soon as possible.</p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px;">This is an automated message from your website's contact form system.</p>
          </div>
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