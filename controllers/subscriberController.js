const Subscriber = require('../models/subscriberModel');
const { isValidEmail } = require('../utils/helpers');
const { sendSMS } = require('../utils/smsUtil');


/**
 * Subscriber Controller
 */
const subscriberController = {
  /**
   * Subscribe email
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  subscribeEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log('email', email)

      
      if (!email) {
        res.status(400);
        throw new Error('Email is required');
      }
      
      if (!isValidEmail(email)) {
        res.status(400);
        throw new Error('Invalid email format');
      }
      
      const existingSubscriber = await Subscriber.findByEmail(email);
      console.log('existingSubscriber', existingSubscriber) 
      
      if (existingSubscriber) {
             
        return res.status(200).json({ 
          success: true, 
          message: 'Email already subscribed' 
        });
      }
      

      const newSubscriber = await Subscriber.create(email);
      console.log('newSubscriber', newSubscriber)
      if(newSubscriber) {
        // Send SMS notification to the subscriber
        try {
          await sendSMS(email);
        } catch (smsError) {
          console.error('SMS notification failed:', smsError);
          // Continue with the response even if SMS fails
        }
        
        res.status(200).json({ 
          success: true, 
          message: 'Email subscription successful' 
        });
      }
    } catch (error) {
      console.log('error', error)
      next(error);
    }
  },
  
  /**
   * Get all subscribers
   * @param {Request} req 
   * @param {Response} res
   * @param {NextFunction} next -
   */

};

module.exports = subscriberController;