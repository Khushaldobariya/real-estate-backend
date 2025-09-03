const { pool } = require('../config/db');
// SQL table creation statement for users

const UserModel = {
  // Find all users
  findAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Find one user by a specific field
  findOne: async (field, value) => {
    try {
      const query = `SELECT * FROM users WHERE ${field} = ?`;
      const [rows] = await pool.query(query, [value]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Find user by ID
  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  findByEmail: async (email) => {

    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  findByPhone: async (phone) => {

    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE phoneNo = ?', [phone]);
     
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  create: async (userData) => {
    try {
      const { name, email, phoneNo, message, projectLocation } = userData;
      console.log('userData', userData)
      const query = `
        INSERT INTO users (name, email, phoneNo, message, projectLocation)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [name, email, phoneNo, message, projectLocation];
      console.log('values', values)
      const [result] = await pool.query(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = {

  ...UserModel
};
