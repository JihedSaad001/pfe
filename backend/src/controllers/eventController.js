import { eventRepository } from "../repositories/eventRepository.js"

export const eventController = {
  getAllEvents: async (req, res, next) => {
    try {
      const { featured, date } = req.query
      const options = { where: {} }

      if (featured) {
        options.where.featured = featured === "true"
      }

      if (date) {
        options.where.date = date
      }

      const events = await eventRepository.findAll(options)
      res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  },

  getEventById: async (req, res, next) => {
    try {
      const { id } = req.params
      const event = await eventRepository.findById(id)

      if (!event) {
        return res.status(404).json({ message: "Event not found" })
      }

      res.status(200).json(event)
    } catch (error) {
      next(error)
    }
  },

  createEvent: async (req, res, next) => {
    try {
      const eventData = req.body
      const newEvent = await eventRepository.create(eventData)
      res.status(201).json(newEvent)
    } catch (error) {
      next(error)
    }
  },

  updateEvent: async (req, res, next) => {
    try {
      const { id } = req.params
      const eventData = req.body
      const updatedEvent = await eventRepository.update(id, eventData)

      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" })
      }

      res.status(200).json(updatedEvent)
    } catch (error) {
      next(error)
    }
  },

  deleteEvent: async (req, res, next) => {
    try {
      const { id } = req.params
      const deleted = await eventRepository.delete(id)

      if (!deleted) {
        return res.status(404).json({ message: "Event not found" })
      }

      res.status(204).end()
    } catch (error) {
      next(error)
    }
  },
}
