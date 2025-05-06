import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { roomRoutes } from "./routes/roomRoutes.js"
import { reservationRoutes } from "./routes/reservationRoutes.js"
import { eventRoutes } from "./routes/eventRoutes.js"
import { inventoryRoutes } from "./routes/inventoryRoutes.js"
import { userRoutes } from "./routes/userRoutes.js"
import { authRoutes } from "./routes/authRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { sequelize } from "./config/database.js"
import Room from "./models/Room.js"
import User from "./models/User.js"
import Event from "./models/Event.js"
import bcrypt from "bcrypt"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/rooms", roomRoutes)
app.use("/api/reservations", reservationRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

// Error handling middleware
app.use(errorHandler)

// Database initialization and server start
const initializeDatabase = async () => {
  try {
    // Test database connection
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")

    // Sync all models with the database
    // Note: { force: true } will drop tables if they exist
    // In production, you should use { force: false } or { alter: true }
    await sequelize.sync({ alter: true })
    console.log("Database synchronized")

    // Check if admin user exists
    const adminExists = await User.findOne({ where: { email: "admin@example.com" } })

    if (!adminExists) {
      console.log("Creating default admin user...")
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10)
      await User.create({
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      })
      console.log("Admin user created")
    }

    // Check if regular user exists
    const userExists = await User.findOne({ where: { email: "john.doe@example.com" } })

    if (!userExists) {
      console.log("Creating default regular user...")
      // Create regular user
      const userPassword = await bcrypt.hash("password123", 10)
      await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: userPassword,
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Anytown, USA",
        role: "guest",
      })
      console.log("Regular user created")
    }

    // Check if sample rooms exist
    const roomCount = await Room.count()

    if (roomCount === 0) {
      console.log("Creating sample rooms...")
      // Create sample rooms
      const rooms = [
        {
          name: "Deluxe King Room",
          description: "Spacious room with king-sized bed, work desk, and city views.",
          type: "Deluxe",
          price: 199,
          capacity: 2,
          image: "/placeholder.svg?height=400&width=600",
          status: "available",
          featured: true,
        },
        {
          name: "Executive Suite",
          description: "Luxurious suite with separate living area and premium amenities.",
          type: "Suite",
          price: 349,
          capacity: 2,
          image: "/placeholder.svg?height=400&width=600",
          status: "available",
          featured: true,
        },
        {
          name: "Family Room",
          description: "Comfortable room for families with two queen beds and extra space.",
          type: "Standard",
          price: 279,
          capacity: 4,
          image: "/placeholder.svg?height=400&width=600",
          status: "available",
          featured: true,
        },
        {
          name: "Presidential Suite",
          description: "Our most luxurious accommodation with panoramic views and butler service.",
          type: "Suite",
          price: 599,
          capacity: 2,
          image: "/placeholder.svg?height=400&width=600",
          status: "available",
          featured: false,
        },
        {
          name: "Twin Room",
          description: "Cozy room with two single beds, perfect for friends traveling together.",
          type: "Standard",
          price: 179,
          capacity: 2,
          image: "/placeholder.svg?height=400&width=600",
          status: "available",
          featured: false,
        },
      ]

      await Room.bulkCreate(rooms)
      console.log("Sample rooms created")
    }

    // Check if sample events exist
    const eventCount = await Event.count()

    if (eventCount === 0) {
      console.log("Creating sample events...")
      // Create sample events
      const events = [
        {
          title: "Summer Gala Dinner",
          description: "Join us for an elegant evening of fine dining and entertainment.",
          date: "2023-07-15",
          time: "19:00",
          location: "Grand Ballroom",
          capacity: 200,
          price: 150,
          image: "/placeholder.svg?height=400&width=600",
          featured: true,
        },
        {
          title: "Wine Tasting Experience",
          description: "Sample premium wines from around the world with our sommelier.",
          date: "2023-07-22",
          time: "18:00",
          location: "Wine Cellar",
          capacity: 30,
          price: 85,
          image: "/placeholder.svg?height=400&width=600",
          featured: true,
        },
        {
          title: "Wedding Showcase",
          description: "Explore our wedding venues and meet with our event planners.",
          date: "2023-08-05",
          time: "11:00",
          location: "Garden Terrace",
          capacity: 100,
          price: 0,
          image: "/placeholder.svg?height=400&width=600",
          featured: true,
        },
      ]

      await Event.bulkCreate(events)
      console.log("Sample events created")
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to connect to the database or initialize data:", error)
  }
}

// Initialize database and start server
initializeDatabase()

export default app
