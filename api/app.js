'use strict';

// Load required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // CORS middleware for cross-origin requests

// Importing user and course routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');

// Variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Create the Express application
const app = express();

// Enable CORS for the client app, allowing requests from React app at 'http://localhost:3000'
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Setup API routes for users and courses
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Friendly greeting for the root route
app.get('/', (req, res) => {
  res.send('Welcome to the REST API project!');
});

// Handler for non-existent routes
app.use((req, res, next) => {
  const err = new Error('Route Not Found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${err.stack}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// Set server port
app.set('port', process.env.PORT || 5000);

// Start the server and listen on the specified port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

// Export the Express app for testing purposes
module.exports = app;
