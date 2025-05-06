import express from "express"
import { reservationController } from "../controllers/reservationController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"

const router = express.Router()

// Protected routes (authenticated users)
router.post("/", authMiddleware, reservationController.createReservation)
router.get("/user/:userId", authMiddleware, reservationController.getUserReservations)
router.put("/:id/cancel", authMiddleware, reservationController.cancelReservation)

// Protected routes (admin only)
router.get("/", authMiddleware, adminMiddleware, reservationController.getAllReservations)
router.get("/:id", authMiddleware, adminMiddleware, reservationController.getReservationById)
router.put("/:id", authMiddleware, adminMiddleware, reservationController.updateReservation)

export const reservationRoutes = router
