import { roomRepository } from "../repositories/roomRepository.js"

export const roomController = {
  getAllRooms: async (req, res, next) => {
    try {
      const { featured, status, type } = req.query
      const options = { where: {} }

      if (featured) {
        options.where.featured = featured === "true"
      }

      if (status) {
        options.where.status = status
      }

      if (type) {
        options.where.type = type
      }

      const rooms = await roomRepository.findAll(options)
      res.status(200).json(rooms)
    } catch (error) {
      next(error)
    }
  },

  getRoomById: async (req, res, next) => {
    try {
      const { id } = req.params
      const room = await roomRepository.findById(id)

      if (!room) {
        return res.status(404).json({ message: "Room not found" })
      }

      res.status(200).json(room)
    } catch (error) {
      next(error)
    }
  },

  createRoom: async (req, res, next) => {
    try {
      const roomData = req.body
      const newRoom = await roomRepository.create(roomData)
      res.status(201).json(newRoom)
    } catch (error) {
      next(error)
    }
  },

  updateRoom: async (req, res, next) => {
    try {
      const { id } = req.params
      const roomData = req.body
      const updatedRoom = await roomRepository.update(id, roomData)

      if (!updatedRoom) {
        return res.status(404).json({ message: "Room not found" })
      }

      res.status(200).json(updatedRoom)
    } catch (error) {
      next(error)
    }
  },

  deleteRoom: async (req, res, next) => {
    try {
      const { id } = req.params
      const deleted = await roomRepository.delete(id)

      if (!deleted) {
        return res.status(404).json({ message: "Room not found" })
      }

      res.status(204).end()
    } catch (error) {
      next(error)
    }
  },
  availableRoom: async (req, res, next) => {
    try {
      const availableRooms = await roomRepository.availableRoom(req.body);
  
      res.status(200).json({
        success: true,
        data: availableRooms
      });
    } catch (error) {
      next(error); // Passes error to your error-handling middleware
    }
  },
  

}
