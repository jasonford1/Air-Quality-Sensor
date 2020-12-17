// Database configuration
const sql = require('mssql');
const config = {
  user: process.env.PARTICLE_DB_USER,
  password: process.env.PARTICLE_DB_PASS,  
  server: process.env.PARTICLE_DB_HOST,
  database: process.env.PARTICLE_DB_NAME,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    "enableArithAbort": true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('SQL Server Connected')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ' + err));

module.exports = { sql, poolPromise }