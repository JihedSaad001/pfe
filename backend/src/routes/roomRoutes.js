import express from "express"
import { roomController } from "../controllers/roomController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"

const router = express.Router()

// Public routes
router.get("/", roomController.getAllRooms)
router.get("/:id", roomController.getRoomById)

// Protected routes (admin only)
router.post("/", authMiddleware, adminMiddleware, roomController.createRoom)
router.put("/:id", authMiddleware, adminMiddleware, roomController.updateRoom)
router.delete("/:id", authMiddleware, adminMiddleware, roomController.deleteRoom)
router.post("/available", authMiddleware, adminMiddleware, roomController.availableRoom)
export const roomRoutes = router
