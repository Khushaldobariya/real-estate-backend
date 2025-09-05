const express = require('express');
const cors = require('cors');

require('dotenv').config();

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




app.use('/api/users', userRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Real Estate API' });
});


app.use(errorHandler);


console.log('process.env.PORT', process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  await testConnection();
});