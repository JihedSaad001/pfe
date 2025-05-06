import Reservation from "../models/Reservation.js"
import Room from "../models/Room.js"
import User from "../models/User.js"

export const reservationRepository = {
  findAll: async (options = {}) => {
    return await Reservation.findAll({
      ...options,
      include: [
        { model: Room, attributes: ["id", "name", "type", "price"] },
        { model: User, attributes: ["id", "firstName", "lastName", "email"] },
      ],
    })
  },

  findById: async (id) => {
    return await Reservation.findByPk(id, {
      include: [
        { model: Room, attributes: ["id", "name", "type", "price"] },
        { model: User, attributes: ["id", "firstName", "lastName", "email"] },
      ],
    })
  },

  findByUserId: async (userId) => {
    return await Reservation.findAll({
      where: { UserId: userId },
      include: [{ model: Room, attributes: ["id", "name", "type", "price"] }],
    })
  },

  findByRoomId: async (roomId) => {
    return await Reservation.findAll({
      where: { RoomId: roomId },
      include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }],
    })
  },

  create: async (reservationData) => {
    return await Reservation.create(reservationData)
  },

  update: async (id, reservationData) => {
    const reservation = await Reservation.findByPk(id)
    if (reservation) {
      return await reservation.update(reservationData)
    }
    return null
  },

  delete: async (id) => {
    const reservation = await Reservation.findByPk(id)
    if (reservation) {
      await reservation.destroy()
      return true
    }
    return false
  },
}
