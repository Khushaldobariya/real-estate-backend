// const express = require('express');
// const cors = require('cors');

// require('dotenv').config({
//   path: ['.env.local', '.env']
// });
// c
// // Import database connection
// const { testConnection } = require('./config/db');

// // Import routes

// const userRoutes = require('./routes/userRouter');
// const subscriberRoutes = require('./routes/subscriberRoutes');

// // Import middleware
// const { errorHandler } = require('./middleware/errorMiddleware');

// // Initialize express app
// const app = express();

// // Middleware

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));


// app.use(express.json());
// app.options("*", cors());
// app.use(express.urlencoded({ extended: true }));




// app.use('/api/users', userRoutes);
// app.use('/api/subscribers', subscriberRoutes);

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Real Estate API' });
// });


// app.use(errorHandler);


// console.log('process.env.PORT', process.env.PORT)
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, "0.0.0.0", async () => {
//   console.log(`Server running on port ${PORT}`);
//   await testConnection();
// });

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');

require('dotenv').config({
  path: ['.env.local', '.env']
});

// Import database connection
const { testConnection } = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRouter');
const subscriberRoutes = require('./routes/subscriberRoutes');

// Import middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Real Estate API' });
});

// Error handler
app.use(errorHandler);

// Port from env
const PORT = process.env.PORT || 5000;

// SSL certificate paths
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.gharhotoaisa.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.gharhotoaisa.com/fullchain.pem')
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, "0.0.0.0", async () => {
  console.log(`✅ HTTPS Server running on port 443`);
  await testConnection();
});

// (Optional) also run HTTP server to redirect to HTTPS
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌍 HTTP server running on port ${PORT}`);
  console.log(`Redirect HTTP traffic to HTTPS in production`);
});
