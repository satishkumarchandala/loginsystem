const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://loginsystem-black.vercel.app',
    'https://loginsystem-ee9s2be9z-satishs-projects-dcf647d3.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Login System API is running' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});