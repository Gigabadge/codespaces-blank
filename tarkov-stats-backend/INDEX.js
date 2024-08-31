// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tarkovstats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Tarkov Stats API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Import auth routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/auth', authRoutes);
