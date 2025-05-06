import Event from "../models/Event.js"

export const eventRepository = {
  findAll: async (options = {}) => {
    return await Event.findAll(options)
  },

  findById: async (id) => {
    return await Event.findByPk(id)
  },

  findFeatured: async () => {
    return await Event.findAll({ where: { featured: true } })
  },

  findByDate: async (date) => {
    return await Event.findAll({ where: { date } })
  },

  create: async (eventData) => {
    return await Event.create(eventData)
  },

  update: async (id, eventData) => {
    const event = await Event.findByPk(id)
    if (event) {
      return await event.update(eventData)
    }
    return null
  },

  delete: async (id) => {
    const event = await Event.findByPk(id)
    if (event) {
      await event.destroy()
      return true
    }
    return false
  },
}
