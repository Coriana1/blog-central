'use strict';

// Third Party Resources
const express = require('express');
const cors = require('cors');

// Project Specific Modules
const handleBadRequest = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./auth/routes.js');
const v1route = require('./routes/v1');
const v2route = require('./routes/v2');

// Prepare the express app
const app = express();

// App Level Middleware
app.use(cors());
app.use(express.json()); // Process JSON input and put the data on req.body
app.use(express.urlencoded({ extended: true })); // Process FORM input and put the data on req.body
app.use(logger);

// Routes
app.use(authRoutes);
app.use('/api/v1', v1route);
app.use('/api/v2', v2route);

// Catch alls
app.use('*', handleBadRequest);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) {throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
