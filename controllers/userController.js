const users = require("../models/userModel");
const { isValidEmail } = require("../utils/helpers");
const {  sendSMSContactFrom } = require("../utils/smsUtil");

const userController = {
    sendContactForm: async (req, res) => {
        try {
            const { name, email, phone, message, projectLocation } = req.body;
            console.log('req.body', req.body)
            
            // Validate required fields
            if(!name || !email || !phone || !message || !projectLocation) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Missing required fields',
                    details: {
                        name: !name ? 'Name is required' : null,
                        email: !email ? 'Email is required' : null,
                        phone: !phone ? 'Phone number is required' : null,
                        message: !message ? 'Message is required' : null,
                        projectLocation: !projectLocation ? 'Project location is required' : null
                    }
                });
            }

            // Validate email format
            if (!isValidEmail(email)) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Invalid email format',
                    details: 'Please provide a valid email address'
                });
            }

            // Check for existing subscriber
            const existingUser = await users.findByEmail( email );
      
            if (existingUser) {
                return res.status(409).json({ 
                    success: false, 
                    message: 'Email already exists',
                    details: 'This email is already registered in our database'
                });
            }
            const existingUserByPhone = await users.findByPhone( phone );
            console.log('existingUserByPhone', existingUserByPhone)
            if (existingUserByPhone) {
                return res.status(409).json({ 
                    success: false, 
                    message: 'Phone number already exists',
                    details: 'This phone number is already registered in our database'
                });
            }

            // Create new contact form entry
            const newFromCreateData = await users.create({
                name,
                email,
                phoneNo: phone,
                message,
                projectLocation
            });

            if(!newFromCreateData) {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to submit contact form',
                    details: 'Unable to create new contact form entry'
                });
            }

            // Send SMS notification
            try {
                await sendSMSContactFrom(email, name, projectLocation, phone , message);
            } catch (smsError) {
                console.error('SMS notification failed:', smsError);
                // Continue execution even if SMS fails
            }

            return res.status(201).json({
                success: true,
                message: 'Contact form submitted successfully',
                data: newFromCreateData
            });

        } catch (error) {
            console.error('Error in sendContactForm:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Internal server error',
                details: error.message || 'An unexpected error occurred while processing your request'
            });
        }
    }
};

module.exports = userController;
