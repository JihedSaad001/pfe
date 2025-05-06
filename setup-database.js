// Script to set up the PostgreSQL database
const { Client } = require('pg');
const dotenv = require('dotenv');
const { spawn } = require('child_process');
const path = require('path');

// Load environment variables from backend/.env
dotenv.config({ path: './backend/.env' });

// Database connection parameters
const dbParams = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// Function to check if PostgreSQL is running
async function checkPostgresRunning() {
  const client = new Client({
    ...dbParams,
    database: 'postgres', // Connect to default database
  });

  try {
    await client.connect();
    console.log('PostgreSQL is running.');
    await client.end();
    return true;
  } catch (err) {
    console.error('PostgreSQL is not running or connection failed:', err.message);
    return false;
  }
}

// Function to check if the hotel database exists
async function checkDatabaseExists() {
  const client = new Client({
    ...dbParams,
    database: 'postgres', // Connect to default database
  });

  try {
    await client.connect();
    const result = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = $1
    `, [process.env.DB_NAME]);
    
    const exists = result.rows.length > 0;
    console.log(`Database "${process.env.DB_NAME}" ${exists ? 'exists' : 'does not exist'}.`);
    await client.end();
    return exists;
  } catch (err) {
    console.error('Error checking if database exists:', err.message);
    return false;
  }
}

// Function to create the hotel database
async function createDatabase() {
  const client = new Client({
    ...dbParams,
    database: 'postgres', // Connect to default database
  });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
    console.log(`Database "${process.env.DB_NAME}" created successfully.`);
    await client.end();
    return true;
  } catch (err) {
    console.error('Error creating database:', err.message);
    return false;
  }
}

// Function to initialize the database with tables and sample data
function initializeDatabase() {
  console.log('Initializing database with tables and sample data...');
  
  const initProcess = spawn('npm', ['run', 'init-db'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: true
  });

  return new Promise((resolve, reject) => {
    initProcess.on('error', (err) => {
      console.error('Failed to initialize database:', err);
      reject(err);
    });

    initProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Database initialized successfully.');
        resolve(true);
      } else {
        console.error(`Database initialization failed with code ${code}`);
        resolve(false);
      }
    });
  });
}

// Main function
async function main() {
  console.log('Checking PostgreSQL status...');
  
  const isPostgresRunning = await checkPostgresRunning();
  if (!isPostgresRunning) {
    console.log('\nPlease make sure PostgreSQL is installed and running.');
    console.log('You can download PostgreSQL from: https://www.postgresql.org/download/');
    console.log('After installation, start the PostgreSQL service and run this script again.');
    return;
  }

  const dbExists = await checkDatabaseExists();
  if (!dbExists) {
    console.log(`Creating database "${process.env.DB_NAME}"...`);
    const created = await createDatabase();
    if (!created) {
      console.log('Failed to create database. Please check your PostgreSQL installation and permissions.');
      return;
    }
  }

  console.log('Setting up database tables and sample data...');
  await initializeDatabase();
  
  console.log('\nDatabase setup complete!');
  console.log('You can now start the backend server with: node start-backend.js');
}

main().catch(err => {
  console.error('An error occurred during database setup:', err);
});
