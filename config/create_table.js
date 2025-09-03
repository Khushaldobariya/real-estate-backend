// Script to create subscribers table
const { pool } = require('./db');



async function createUserTable() {
  try {
    console.log('Creating user table-----')
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phoneNo VARCHAR(100) NOT NULL UNIQUE,
        message TEXT,
        projectLocation VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    // Execute create table query
    await pool.query(createTableSQL);
    console.log('✅ User table created successfully');
    
    // Check if table already has data
    const [existingRows] = await pool.query('SELECT COUNT(*) as count FROM users');
    
    if (existingRows[0].count === 0) {
      // Insert initial data
      const insertDataSQL = `
        INSERT INTO users (name, email, phoneNo, message, projectLocation) VALUES
        ('John Doe', 'user@example.com', '9632587415', 'Sample inquiry message', 'Vasai')
      `;
      
      await pool.query(insertDataSQL);
      console.log('✅ Initial data inserted successfully');
    } else {
      console.log('ℹ️ Table already has data, skipping initial data insertion');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error creating users table:', error.message);
    return false;
  }
}

// async function createSubscribersTable() {
//   try {
//     console.log('Creating subscribers table...');
    
//     // SQL to create table
//     const createTableSQL = `
//       CREATE TABLE IF NOT EXISTS subscribers (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         email VARCHAR(100) NOT NULL UNIQUE,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//       )
//     `;
    
//     // Execute create table query
//     await pool.query(createTableSQL);
//     console.log('✅ Subscribers table created successfully');
    
//     // Check if table already has data
//     const [existingRows] = await pool.query('SELECT COUNT(*) as count FROM subscribers');
    
//     if (existingRows[0].count === 0) {
//       // Insert initial data
//       const insertDataSQL = `
//         INSERT INTO subscribers (email) VALUES
//         ('admin@example.com'),
//         ('agent@example.com'),
//         ('user@example.com')
//       `;
      
//       await pool.query(insertDataSQL);
//       console.log('✅ Initial data inserted successfully');
//     } else {
//       console.log('ℹ️ Table already has data, skipping initial data insertion');
//     }
    
//     return true;
//   } catch (error) {
//     console.error('❌ Error creating subscribers table:', error.message);
//     return false;
//   }
// }

// Execute the function
// createSubscribersTable()
createUserTable()
  .then(() => {
    console.log('Script execution completed');
    process.exit(0);
  })
  .catch(err => {
    console.error('Script execution failed:', err);
    process.exit(1);
  });