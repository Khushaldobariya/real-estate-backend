/**
 * SMS Service Configuration
 */
const dotenv = require('dotenv');

dotenv.config();

const smsConfig = {
  // Default provider
  defaultProvider: process.env.SMS_PROVIDER || 'SMTP',
  
  // SMTP configuration
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || 'noreply@example.com'
  },
  

};

module.exports = smsConfig;