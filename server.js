// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Import your route handlers

// Create an Express application
const app = express();

// Define middleware and routes
app.use(express.json());
app.use('/api', routes); // Assuming your API routes are under the '/api' path

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection events
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');

  // Sync Mongoose models to the MongoDB database
  // This assumes you have defined your Mongoose models in separate files (e.g., User.js, Thought.js)
  require('./models/user');
  require('./models/thought');

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});