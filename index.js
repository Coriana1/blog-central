'use strict'; 

require('dotenv').config();
const { bd } = require('PLACEHOLD');
const server = require('PLACEHOLDER');
const PORT = process.env.PORT || 3001;

debug.sync().then() => {
  server.start(PORT);
});