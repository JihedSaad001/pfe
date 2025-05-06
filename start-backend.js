// Script to check if the backend is running and start it if needed
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

// Function to check if the backend is running
function checkBackendRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5000/api/rooms', (res) => {
      if (res.statusCode === 200) {
        console.log('Backend is already running.');
        resolve(true);
      } else {
        console.log(`Backend returned status code ${res.statusCode}`);
        resolve(false);
      }
    });

    req.on('error', (err) => {
      console.log('Backend is not running:', err.message);
      resolve(false);
    });

    req.end();
  });
}

// Function to start the backend
function startBackend() {
  console.log('Starting backend...');
  
  const backendProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: true
  });

  backendProcess.on('error', (err) => {
    console.error('Failed to start backend:', err);
  });

  backendProcess.on('close', (code) => {
    if (code !== 0) {
      console.log(`Backend process exited with code ${code}`);
    }
  });

  console.log('Backend started. Press Ctrl+C to stop.');
}

// Main function
async function main() {
  const isRunning = await checkBackendRunning();
  
  if (!isRunning) {
    startBackend();
  }
}

main();
