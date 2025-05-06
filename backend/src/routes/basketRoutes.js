import express from "express"
import { basketController } from "../controllers/BasketController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"

const router = express.Router()

// Protected routes (authenticated users)
router.use(authMiddleware)

// User basket routes
router.get("/my-basket", basketController.getUserBasket)
router.post("/rooms", basketController.addRoomToBasket)
router.post("/events", basketController.addEventToBasket)
router.put("/items/:itemId", basketController.updateBasketItem)
router.delete("/items/:itemId", basketController.removeBasketItem)
router.delete("/clear", basketController.clearBasket)
router.post("/confirm", basketController.confirmReservations)

// Admin routes
router.get("/", authMiddleware, adminMiddleware, basketController.getAllBaskets)
router.get("/:id", authMiddleware, adminMiddleware, basketController.getBasketById)

export const basketRoutes = router
