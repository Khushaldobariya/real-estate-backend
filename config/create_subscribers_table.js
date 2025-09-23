// Script to create subscribers table
const { pool } = require('./db');

async function createSubscribersTable() {
  try {
    console.log('Creating subscribers table-----')
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    // Execute create table query
    await pool.query(createTableSQL);
    console.log('✅ Subscribers table created successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Error creating subscribers table:', error.message);
    return false;
  }
}

// Create blogs table
async function createBlogsTable() {
  try {
    console.log('Creating blogs table-----')
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      )
    `;
    // Execute create table query
    await pool.query(createTableSQL);
    console.log('✅ Blogs table created successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Error creating blogs table:', error.message);
    return false;
  }
}

// Create comments table
async function createCommentsTable() {
  try {
    console.log('Creating comments table-----')
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_id INT NOT NULL,
        parent_id INT NULL,
        user_name VARCHAR(100) NOT NULL,
        user_email VARCHAR(255),
        comment_text TEXT NOT NULL,
        is_author_reply BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
      )
    `;
    // Execute create table query
    await pool.query(createTableSQL);
    console.log('✅ Comments table created successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Error creating comments table:', error.message);
    return false;
  }
}

// Run all table creation functions
async function createAllTables() {
  await createSubscribersTable();
  await createBlogsTable();
  await createCommentsTable();
  console.log('All tables created successfully');
  process.exit(0);
}

createAllTables();