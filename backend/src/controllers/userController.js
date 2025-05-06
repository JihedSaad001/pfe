import { userRepository } from "../repositories/userRepository.js"
import bcrypt from "bcrypt"

export const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const { role } = req.query
      const options = { where: {} }

      if (role) {
        options.where.role = role
      }

      const users = await userRepository.findAll(options)

      // Remove password from response
      const sanitizedUsers = users.map((user) => {
        const userData = user.get()
        delete userData.password
        return userData
      })

      res.status(200).json(sanitizedUsers)
    } catch (error) {
      next(error)
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await userRepository.findById(id)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      // Remove password from response
      const userData = user.get()
      delete userData.password

      res.status(200).json(userData)
    } catch (error) {
      next(error)
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, phone, address, role } = req.body

      // Check if user already exists
      const existingUser = await userRepository.findByEmail(email)
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const newUser = await userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        address,
        role: role || "guest",
      })

      // Remove password from response
      const userData = newUser.get()
      delete userData.password

      res.status(201).json(userData)
    } catch (error) {
      next(error)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const { firstName, lastName, email, phone, address, role } = req.body

      // Check if user exists
      const user = await userRepository.findById(id)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      // If email is being changed, check if new email is already in use
      if (email && email !== user.email) {
        const existingUser = await userRepository.findByEmail(email)
        if (existingUser) {
          return res.status(409).json({ message: "Email is already in use" })
        }
      }

      // Update user
      const updatedUser = await userRepository.update(id, {
        firstName,
        lastName,
        email,
        phone,
        address,
        role,
      })

      // Remove password from response
      const userData = updatedUser.get()
      delete userData.password

      res.status(200).json(userData)
    } catch (error) {
      next(error)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params

      // Check if user exists
      const user = await userRepository.findById(id)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      // Delete user
      await userRepository.delete(id)

      res.status(204).end()
    } catch (error) {
      next(error)
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { id } = req.params
      const { newPassword } = req.body

      // Check if user exists
      const user = await userRepository.findById(id)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Update password
      await userRepository.update(id, { password: hashedPassword })

      res.status(200).json({ message: "Password reset successfully" })
    } catch (error) {
      next(error)
    }
  },
}
