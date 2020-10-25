//require('dotenv').config();
const express = require('express');
const tedious = require('tedious');
const bodyParser = require('body-parser');
const path = require('path');

// Create app
const app = express();

// Database configuration
const { Connection, Request } = require('tedious');
const db_config = require('./config/database');

// Connect database
const connection = new Connection(db_config);
connection.connect(err => {
    if(err) { console.error(err.message) }
    else { console.log('SQL DATABASE CONNECTED') }
});

// Respond to GET request at '/particle'
app.get('/particle', (req, res) => res.send('HELLO PARTICLE!'));

// Respond to POST request at '/particle'
app.post('/particle', (req, res) => {
    let data = JSON.parse(req.body.data);
    // Convert air quality reading from string to INT for database
    let air_quality = (data['air-quality'] === 'Fresh Air') ? 0 : 
        (data['air-quality'] === 'Low Pollution') ? 1 :
        (data['air-quality'] === 'High Pollution') ? 2 :
        (data['air-quality'] === 'Danger') ? 3 : null;
    // Build SQL request to insert sensor readings into database
    let request = new Request ('INSERT INTO [env-vals] (coreid, datetime, temp, humidity, pressure, air_quality, dust_lpo, dust_ratio, dust_concentration) VALUES (@coreid, @datetime, @temp, @humidity, @pressure, @air_quality, @dust_lpo, @dust_ratio, @dust_concentration)',
        (err, result) => {
        if(err) { console.error(err.message) }
        else { res.sendStatus(200) }
        });
    // Add sensor readings with names matched to SQL request above
    request.addParameter('coreid', TYPES.NVarChar, req.body.coreid, {length:70})
    request.addParameter('datetime', TYPES.DateTime2, req.body.published_at)
    request.addParameter('temp', TYPES.SmallInt, data.temp)
    request.addParameter('humidity', TYPES.TinyInt, data.humidity)
    request.addParameter('pressure', TYPES.SmallInt, data.pressure)
    request.addParameter('air_quality', TYPES.TinyInt, air_quality_val)
    request.addParameter('dust_lpo', TYPES.Int, data['dust-lpo'])
    request.addParameter('dust_ratio', TYPES.Decimal, data['dust-ratio'], {precision:15,scale:7})
    request.addParameter('dust_concentration', TYPES.Decimal, data['dust-concentration'], {precision:15,scale:7})
    // Execute SQL request
    connection.execSql(request);
})

// Set connection port
const PORT = process.env.PARTICLE_PORT || 3001;

// Begin listening for requests and console.log upon success
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)} );
