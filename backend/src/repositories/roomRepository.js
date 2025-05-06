import Room from "../models/Room.js"
import { Op } from "sequelize"


export const roomRepository = {
  findAll: async (options = {}) => {
    return await Room.findAll(options)
  },

  findById: async (id) => {
    return await Room.findByPk(id)
  },

  findByStatus: async (status) => {
    return await Room.findAll({ where: { status } })
  },

  findFeatured: async () => {
    return await Room.findAll({ where: { featured: true } })
  },

  create: async (roomData) => {
    return await Room.create(roomData)
  },

  update: async (id, roomData) => {
    const room = await Room.findByPk(id)
    if (room) {
      return await room.update(roomData)
    }
    return null
  },

  delete: async (id) => {
    const room = await Room.findByPk(id)
    if (room) {
      await room.destroy()
      return true
    }
    return false
  },
  availableRoom: async (body) => {
    try {
      const startDate = body.startDate;
      const finishDate = body.finishDate;
      const peopleNb = parseInt(body.peopleNb);
  
      const availableRooms = await Room.findAll({
        where: {
          capacity: {
            [Op.gte]: peopleNb ,

          },
          status: "available" // status must be 'available'

        }
      });
  console.log('rooms',availableRooms)
      return availableRooms;
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      throw error; // rethrow so it can be handled upstream if needed
    }
  },

}
