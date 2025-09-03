-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `erltetmy_real-esate-web`;

-- Switch to database
USE `erltetmy_real-esate-web`;

-- Create users table if not exists
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phoneNo VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  message TEXT,
  projectLocation VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, phoneNo, message, projectLocation) VALUES
    ('John Doe', 'user@example.com', '9632587415', 'Sample inquiry message', 'Vasai');
