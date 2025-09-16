const mysql = require("mysql2");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config({ path: ".env.local" });

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const promisePool = pool.promise();

// Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Test the connection
const testConnection = async () => {
  try {
    const [rows] = await promisePool.query("SELECT 1");
    await sequelize.authenticate();
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

module.exports = {
  pool: promisePool,
  sequelize,
  testConnection,
};





