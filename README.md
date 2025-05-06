# Luxury Hotel Management System

This project is a hotel management system with a React/Next.js frontend and Node.js/Express backend.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Project Structure

- `/frontend` - Next.js frontend application
- `/backend` - Express.js backend API

## Setup Instructions

### 1. Install Dependencies

First, install the dependencies for both the frontend and backend:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Set Up PostgreSQL Database

Make sure PostgreSQL is installed and running on your system. Then run:

```bash
# Install required packages for the setup scripts
npm install pg dotenv

# Run the database setup script
node setup-database.js
```

This script will:
- Check if PostgreSQL is running
- Create the hotel database if it doesn't exist
- Initialize the database with tables and sample data

### 3. Start the Backend Server

```bash
node start-backend.js
```

The backend server will start on http://localhost:5000

### 4. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000

## Default User Accounts

The system comes with two default user accounts:

1. **Admin User**
   - Email: admin@example.com
   - Password: admin123

2. **Regular User**
   - Email: john.doe@example.com
   - Password: password123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get a specific room
- `POST /api/rooms` - Create a new room (admin only)
- `PUT /api/rooms/:id` - Update a room (admin only)
- `DELETE /api/rooms/:id` - Delete a room (admin only)

### Reservations
- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations/user/:userId` - Get user reservations
- `PUT /api/reservations/:id/cancel` - Cancel a reservation

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event (admin only)
- `PUT /api/events/:id` - Update an event (admin only)
- `DELETE /api/events/:id` - Delete an event (admin only)

### Basket
- `GET /api/basket` - Get user's basket
- `POST /api/basket/rooms` - Add a room to basket
- `POST /api/basket/events` - Add an event to basket
- `DELETE /api/basket/items/:itemId` - Remove item from basket
- `DELETE /api/basket/clear` - Clear basket

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check the database credentials in `backend/.env`
- Try running `node check-postgres.js` to test the connection

### API Connection Issues
- Make sure the backend server is running on port 5000
- Check the browser console for any CORS errors
- Verify that the frontend is using the correct API URL
