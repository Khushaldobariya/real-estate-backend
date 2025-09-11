const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

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
console.log('process.env.PORT', process.env.PORT)
const PORT = process.env.PORT || 4000;
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.gharhotoaisa.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.gharhotoaisa.com/fullchain.pem')
};

https.createServer(sslOptions, app).listen(PORT, "0.0.0.0", async () => {
  console.log(`✅ HTTPS Server running on port 443`);
  await testConnection();
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));




app.use('/api/users', userRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Real Estate API' });
});


app.use(errorHandler);




app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  await testConnection();
});