const knex = require('knex');
const config = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

// Test the connection
db.raw('SELECT 1')
  .then(() => {
    console.log(`Connected to ${environment} database`);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = {
  db
}; 