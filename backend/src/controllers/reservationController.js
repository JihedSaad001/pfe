import { reservationRepository } from "../repositories/reservationRepository.js"
import { roomRepository } from "../repositories/roomRepository.js"

export const reservationController = {
  getAllReservations: async (req, res, next) => {
    try {
      const { status, userId, roomId } = req.query
      const options = { where: {} }

      if (status) {
        options.where.status = status
      }

      if (userId) {
        options.where.UserId = userId
      }

      if (roomId) {
        options.where.RoomId = roomId
      }

      const reservations = await reservationRepository.findAll(options)
      res.status(200).json(reservations)
    } catch (error) {
      next(error)
    }
  },

  getReservationById: async (req, res, next) => {
    try {
      const { id } = req.params
      const reservation = await reservationRepository.findById(id)

      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" })
      }

      res.status(200).json(reservation)
    } catch (error) {
      next(error)
    }
  },

  getUserReservations: async (req, res, next) => {
    try {
      const { userId } = req.params
      const reservations = await reservationRepository.findByUserId(userId)
      res.status(200).json(reservations)
    } catch (error) {
      next(error)
    }
  },

  createReservation: async (req, res, next) => {
    try {
      const { roomId, checkInDate, checkOutDate, numberOfGuests, userId, specialRequests } = req.body

      // Check if room exists and is available
      const room = await roomRepository.findById(roomId)
      if (!room) {
        return res.status(404).json({ message: "Room not found" })
      }

      if (room.status !== "available") {
        return res.status(400).json({ message: "Room is not available for booking" })
      }

      // Calculate total price based on room price and stay duration
      const checkIn = new Date(checkInDate)
      const checkOut = new Date(checkOutDate)
      const stayDuration = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

      if (stayDuration <= 0) {
        return res.status(400).json({ message: "Check-out date must be after check-in date" })
      }

      const totalPrice = room.price * stayDuration

      // Create reservation
      const newReservation = await reservationRepository.create({
        RoomId: roomId,
        UserId: userId,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        totalPrice,
        specialRequests,
        status: "confirmed",
      })

      // Update room status to occupied
      await roomRepository.update(roomId, { status: "occupied" })

      res.status(201).json(newReservation)
    } catch (error) {
      next(error)
    }
  },

  updateReservation: async (req, res, next) => {
    try {
      const { id } = req.params
      const reservationData = req.body
      const updatedReservation = await reservationRepository.update(id, reservationData)

      if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found" })
      }

      res.status(200).json(updatedReservation)
    } catch (error) {
      next(error)
    }
  },

  cancelReservation: async (req, res, next) => {
    try {
      const { id } = req.params
      const reservation = await reservationRepository.findById(id)

      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" })
      }

      // Update reservation status to cancelled
      await reservationRepository.update(id, { status: "cancelled" })

      // Update room status back to available
      await roomRepository.update(reservation.RoomId, { status: "available" })

      res.status(200).json({ message: "Reservation cancelled successfully" })
    } catch (error) {
      next(error)
    }
  },
}
