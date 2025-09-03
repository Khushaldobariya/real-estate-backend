const { pool } = require('../config/db');
const { isValidEmail } = require('../utils/helpers');

/**
 * Subscriber Model with database query methods
 */
const Subscriber = {
   
  /**
   * Get all subscribers
   * @returns {Promise<Array>} Array of subscriber objects
   */
  findAll: async () => {
    try {
      const [rows] = await pool.query('SELECT id, email, created_at FROM subscribers');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find subscriber by email
   * @param {string} email - Subscriber email
   * @returns {Promise<Object>} Subscriber object
   */
  findByEmail: async (email) => {
    try {
      const [rows] = await pool.query(
        'SELECT id, email, created_at FROM subscribers WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new subscriber
   * @param {string} email - Subscriber email
   * @returns {Promise<Object>} Created subscriber object
   */
  create: async (email) => {
    try {
      // Validate email format
      if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
      }
      
      const [result] = await pool.query(
        'INSERT INTO subscribers (email) VALUES (?)',
        [email]
      );

      return { id: result.insertId, email };
    } catch (error) {
      // Handle duplicate entry error
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already subscribed');
      }
      throw error;
    }
  }
};

module.exports = Subscriber;