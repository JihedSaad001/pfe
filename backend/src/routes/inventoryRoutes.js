import express from "express"
import { inventoryController } from "../controllers/inventoryController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"

const router = express.Router()

// All inventory routes are protected for staff/admin only
router.use(authMiddleware, adminMiddleware)

router.get("/", inventoryController.getAllItems)
router.get("/:id", inventoryController.getItemById)
router.post("/", inventoryController.createItem)
router.put("/:id", inventoryController.updateItem)
router.delete("/:id", inventoryController.deleteItem)
router.patch("/:id/quantity", inventoryController.updateQuantity)

export const inventoryRoutes = router
