import express from "express"
import { userController } from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"

const router = express.Router()

// All user routes are protected for admin only
router.use(authMiddleware, adminMiddleware)

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.post("/", userController.createUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
router.put("/:id/reset-password", userController.resetPassword)

export const userRoutes = router
