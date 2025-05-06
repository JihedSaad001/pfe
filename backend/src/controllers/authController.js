import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import dotenv from "dotenv"

dotenv.config()

export const authController = {
  register: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, phone, address } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create new user
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        address,
        role: "guest", // Default role for new registrations
      })

      // Generate JWT token
      const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      })

      // Return user data (excluding password) and token
      const userData = { ...newUser.get(), password: undefined }

      res.status(201).json({
        message: "User registered successfully",
        user: userData,
        token,
      })
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      // Find user by email
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" })
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      })

      // Return user data (excluding password) and token
      const userData = { ...user.get(), password: undefined }

      res.status(200).json({
        message: "Login successful",
        user: userData,
        token,
      })
    } catch (error) {
      next(error)
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const userId = req.user.id

      // Find user by ID
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      // Return user data (excluding password)
      const userData = { ...user.get(), password: undefined }

      res.status(200).json(userData)
    } catch (error) {
      next(error)
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { firstName, lastName, phone, address } = req.body

      // Find user by ID
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      // Update user data
      user.firstName = firstName || user.firstName
      user.lastName = lastName || user.lastName
      user.phone = phone || user.phone
      user.address = address || user.address

      await user.save()

      // Return updated user data (excluding password)
      const userData = { ...user.get(), password: undefined }

      res.status(200).json({
        message: "Profile updated successfully",
        user: userData,
      })
    } catch (error) {
      next(error)
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { currentPassword, newPassword } = req.body

      // Find user by ID
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      // Check current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Current password is incorrect" })
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Update password
      user.password = hashedPassword
      await user.save()

      res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
      next(error)
    }
  },
}
