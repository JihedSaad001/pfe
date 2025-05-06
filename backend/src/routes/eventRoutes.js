import express from "express"
import { eventController } from "../controllers/eventController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"

const router = express.Router()

// Public routes
router.get("/", eventController.getAllEvents)
router.get("/:id", eventController.getEventById)

// Protected routes (admin only)
router.post("/", authMiddleware, adminMiddleware, eventController.createEvent)
router.put("/:id", authMiddleware, adminMiddleware, eventController.updateEvent)
router.delete("/:id", authMiddleware, adminMiddleware, eventController.deleteEvent)

export const eventRoutes = router
