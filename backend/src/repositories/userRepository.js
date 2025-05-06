import User from "../models/User.js"

export const userRepository = {
  findAll: async (options = {}) => {
    return await User.findAll(options)
  },

  findById: async (id) => {
    return await User.findByPk(id)
  },

  findByEmail: async (email) => {
    return await User.findOne({ where: { email } })
  },

  findByRole: async (role) => {
    return await User.findAll({ where: { role } })
  },

  create: async (userData) => {
    return await User.create(userData)
  },

  update: async (id, userData) => {
    const user = await User.findByPk(id)
    if (user) {
      return await user.update(userData)
    }
    return null
  },

  delete: async (id) => {
    const user = await User.findByPk(id)
    if (user) {
      await user.destroy()
      return true
    }
    return false
  },
}
