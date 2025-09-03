const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

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


// Test the connection
const testConnection = async () => {
  try {
    const [rows] = await promisePool.query("SELECT 1");
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

module.exports = {
  pool: promisePool,
  testConnection,
};
