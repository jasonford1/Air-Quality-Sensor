require('dotenv').config();
const express = require('express');
const tedious = require('tedious');
const bodyParser = require('body-parser');
const path = require('path');

// Create app
const app = express();

// Database configuration
const { Connection, Request } = require('tedious');
const db_config = require('./config/database');

// Test database connection
const connection = new Connection(db_config);
connection.connect(err => {
    if(err) { console.error(err.message) }
    else { console.log('SQL DATABASE CONNECTED') }
});

// Respond to request at '/particle'
app.get('/particle', (req, res) => res.send('HELLO PARTICLE!'));

// Set connection port
const PORT = process.env.PARTICLE_PORT || 3001;

// Begin listening for requests and console.log upon success
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)} );
