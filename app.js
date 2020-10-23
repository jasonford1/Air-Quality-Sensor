const express = require('express');
const tedious = require('tedious');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.get('/', (req, res) => res.send('HELLO PARTICLE!'));

const PORT = process.env.PORT || 3001;

app.listen();

app.listen(PORT, console.log(`Server started on port ${PORT}`));