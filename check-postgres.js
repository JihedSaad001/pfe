// Simple script to check PostgreSQL connection
const { Client } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from backend/.env
dotenv.config({ path: './backend/.env' });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function checkConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to PostgreSQL!');
    const res = await client.query('SELECT version()');
    console.log('PostgreSQL version:', res.rows[0].version);
    await client.end();
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
    console.log('\nPossible solutions:');
    console.log('1. Make sure PostgreSQL is installed and running');
    console.log('2. Check that the database credentials in backend/.env are correct');
    console.log('3. Ensure the database "hotel-db" exists');
  }
}

checkConnection();
