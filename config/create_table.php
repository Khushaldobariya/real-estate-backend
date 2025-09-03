<?php
// Database connection parameters
$host = '162.240.55.195';
$user = 'erltetmy_real-esate-web';
$password = 'Real@estateWeb123';
$database = 'erltetmy_real-esate-web';

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL to create table
$sql = "CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phoneNo VARCHAR(100) NOT NULL UNIQUE,
  message TEXT,
  projectLocation VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

// Execute query
if ($conn->query($sql) === TRUE) {
    echo "Table 'users' created successfully";
    
    // Insert initial data
    $insertSql = "INSERT INTO users (name, email, phoneNo, message, projectLocation) VALUES
    ('John Doe', 'user@example.com', '9632587415', 'Sample inquiry message', 'Vasai')";
    
    if ($conn->query($insertSql) === TRUE) {
        echo "\nInitial data inserted successfully";
    } else {
        echo "\nError inserting initial data: " . $conn->error;
    }
} else {
    echo "Error creating table: " . $conn->error;
}

// Close connection
$conn->close();
?>