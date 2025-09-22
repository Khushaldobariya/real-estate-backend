const express = require('express');
const cors = require('cors');

require('dotenv').config({
  path: ['.env.local', '.env']
});


const { testConnection, sequelize } = require('./config/db');



const userRoutes = require('./routes/userRouter');
const subscriberRoutes = require('./routes/subscriberRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');


const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
console.log('process.env.PORT', process.env.PORT)
const PORT = process.env.PORT || 5000;

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
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Real Estate API' });
});

app.use(errorHandler);


app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  await testConnection();
  
  // Sync Sequelize models with database
  try {
    await sequelize.sync();
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Failed to sync database models:', error);
  }
});

