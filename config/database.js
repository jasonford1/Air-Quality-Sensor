// Database configuration
const db_config = {
    server: process.env.PARTICLE_DB_HOST,
    authentication: {
      type: 'default',
      options: {
        userName: process.env.PARTICLE_DB_USER,
        password: process.env.PARTICLE_DB_PASS
      },
    },
    options: {
      encrypt: true,
      database: process.env.PARTICLE_DB_NAME
    }
  };
  
  module.exports = db_config;