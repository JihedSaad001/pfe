import { sequelize } from "./config/database.js"
import Room from "./models/Room.js"
import User from "./models/User.js"
import Event from "./models/Event.js"
import InventoryItem from "./models/InventoryItem.js"
import bcrypt from "bcrypt"

async function initDb() {
  try {
    // Test database connection
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")

    // Sync all models with the database
    await sequelize.sync({ force: true })
    console.log("Database synchronized")

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

    // Create sample inventory items
    const inventoryItems = [
      {
        name: "Bath Towels",
        category: "Linens",
        quantity: 500,
        unit: "piece",
        minQuantity: 100,
        price: 15,
        supplier: "Luxury Linens Co.",
      },
      {
        name: "Shampoo",
        category: "Toiletries",
        quantity: 1000,
        unit: "bottle",
        minQuantity: 200,
        price: 5,
        supplier: "Hotel Supplies Inc.",
      },
      {
        name: "Coffee Pods",
        category: "Food & Beverage",
        quantity: 2000,
        unit: "pod",
        minQuantity: 500,
        price: 0.75,
        supplier: "Gourmet Coffee Distributors",
      },
    ]

    await InventoryItem.bulkCreate(inventoryItems)
    console.log("Sample inventory items created")

    console.log("Database initialization completed successfully")
  } catch (error) {
    console.error("Database initialization failed:", error)
  } finally {
    process.exit()
  }
}

initDb()
