// Script to start both frontend and backend
const { spawn } = require('child_process');
const path = require('path');

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

  return backendProcess;
}

// Function to start the frontend
function startFrontend() {
  console.log('Starting frontend...');
  
  const frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true
  });

  frontendProcess.on('error', (err) => {
    console.error('Failed to start frontend:', err);
  });

  return frontendProcess;
}

// Main function
function main() {
  console.log('Starting Luxury Hotel Management System...');
  
  const backend = startBackend();
  
  // Wait a bit for the backend to start before starting the frontend
  setTimeout(() => {
    const frontend = startFrontend();
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('Shutting down...');
      backend.kill();
      frontend.kill();
      process.exit(0);
    });
  }, 5000);
  
  console.log('\nPress Ctrl+C to stop all services.');
}

main();
