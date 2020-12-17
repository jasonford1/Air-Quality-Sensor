require('dotenv').config();
const express = require('express');

// Create app and include urlencoded json parsing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route Handling
const particleRouter = require('./routes/particle'); // Back end data capture

// Set Routes
app.use('/particle', particleRouter);

// Set connection port
const PORT = process.env.PARTICLE_PORT || 3001;

// Start server and console.log upon success
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)} );
