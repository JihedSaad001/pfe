import { basketRepository } from "../repositories/basketRepository.js"
import { roomRepository } from "../repositories/roomRepository.js"
import { eventRepository } from "../repositories/eventRepository.js"
import { calculateNights } from "../utils/dateUtils.js"

export const basketController = {
  getAllBaskets: async (req, res, next) => {
    try {
      const baskets = await basketRepository.findAll()
      res.status(200).json(baskets)
    } catch (error) {
      next(error)
    }
  },

  getBasketById: async (req, res, next) => {
    try {
      const { id } = req.params
      const basket = await basketRepository.findById(id)

      if (!basket) {
        return res.status(404).json({ message: "Basket not found" })
      }

      res.status(200).json(basket)
    } catch (error) {
      next(error)
    }
  },

  getUserBasket: async (req, res, next) => {
    try {
      const userId = req.user.id

      // Find active basket or create a new one
      let basket = await basketRepository.findByUserId(userId)

      if (!basket) {
        basket = await basketRepository.create({
          UserId: userId,
          status: "active",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        })
      }

      // Get basket items with detailed information
      const basketItems = await basketRepository.getBasketItems(basket.id)
      const detailedItems = await Promise.all(
        basketItems.map(async (item) => {
          const itemData = item.toJSON()

          // Add detailed information based on item type
          if (item.itemType === "room") {
            const room = await roomRepository.findById(item.itemId)
            if (room) {
              itemData.details = {
                name: room.name,
                type: room.type,
                image: room.image,
              }
            }
          } else if (item.itemType === "event") {
            const event = await eventRepository.findById(item.itemId)
            if (event) {
              itemData.details = {
                title: event.title,
                location: event.location,
                image: event.image,
              }
            }
          }

          return itemData
        }),
      )

      res.status(200).json({
        ...basket.toJSON(),
        items: detailedItems,
      })
    } catch (error) {
      next(error)
    }
  },

  addRoomToBasket: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { roomId, startDate, endDate, guests, specialRequests } = req.body

      // Validate input
      if (!roomId || !startDate || !endDate || !guests) {
        return res.status(400).json({ message: "Missing required fields" })
      }

      // Check if room exists and is available
      const room = await roomRepository.findById(roomId)
      if (!room) {
        return res.status(404).json({ message: "Room not found" })
      }

      if (room.status !== "available") {
        return res.status(400).json({ message: "Room is not available for booking" })
      }

      // Calculate total price based on room price and stay duration
      const nights = calculateNights(startDate, endDate)
      if (nights <= 0) {
        return res.status(400).json({ message: "Check-out date must be after check-in date" })
      }

      const price = room.price * nights

      // Find or create user's basket
      let basket = await basketRepository.findByUserId(userId)
      if (!basket) {
        basket = await basketRepository.create({
          UserId: userId,
          status: "active",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        })
      }

      // Add room to basket
      const basketItem = await basketRepository.addItem(basket.id, {
        itemType: "room",
        itemId: roomId,
        quantity: 1,
        price,
        startDate,
        endDate,
        guests,
        specialRequests,
      })

      res.status(201).json({
        message: "Room added to basket",
        basketItem,
      })
    } catch (error) {
      next(error)
    }
  },

  addEventToBasket: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { eventId, quantity, specialRequests } = req.body

      // Validate input
      if (!eventId || !quantity) {
        return res.status(400).json({ message: "Missing required fields" })
      }

      // Check if event exists
      const event = await eventRepository.findById(eventId)
      if (!event) {
        return res.status(404).json({ message: "Event not found" })
      }

      // Calculate total price
      const price = event.price * quantity

      // Find or create user's basket
      let basket = await basketRepository.findByUserId(userId)
      if (!basket) {
        basket = await basketRepository.create({
          UserId: userId,
          status: "active",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        })
      }

      // Add event to basket
      const basketItem = await basketRepository.addItem(basket.id, {
        itemType: "event",
        itemId: eventId,
        quantity,
        price,
        startDate: event.date, // Use event date
        specialRequests,
      })

      res.status(201).json({
        message: "Event added to basket",
        basketItem,
      })
    } catch (error) {
      next(error)
    }
  },

  updateBasketItem: async (req, res, next) => {
    try {
      const { itemId } = req.params
      const { quantity, specialRequests } = req.body

      // Update basket item
      const updatedItem = await basketRepository.updateItem(itemId, {
        quantity,
        specialRequests,
      })

      res.status(200).json({
        message: "Basket item updated",
        basketItem: updatedItem,
      })
    } catch (error) {
      next(error)
    }
  },

  removeBasketItem: async (req, res, next) => {
    try {
      const { itemId } = req.params

      // Remove basket item
      await basketRepository.removeItem(itemId)

      res.status(200).json({
        message: "Item removed from basket",
      })
    } catch (error) {
      next(error)
    }
  },

  clearBasket: async (req, res, next) => {
    try {
      const userId = req.user.id

      // Find user's basket
      const basket = await basketRepository.findByUserId(userId)
      if (!basket) {
        return res.status(404).json({ message: "Basket not found" })
      }

      // Clear basket
      await basketRepository.clearBasket(basket.id)

      res.status(200).json({
        message: "Basket cleared",
      })
    } catch (error) {
      next(error)
    }
  },

  confirmReservations: async (req, res, next) => {
    try {
      const userId = req.user.id

      // Find user's basket
      const basket = await basketRepository.findByUserId(userId)
      if (!basket) {
        return res.status(404).json({ message: "Basket not found" })
      }

      // Check if basket has items
      const basketItems = await basketRepository.getBasketItems(basket.id)
      if (basketItems.length === 0) {
        return res.status(400).json({ message: "Basket is empty" })
      }

      // Convert basket items to reservations
      const reservations = await basketRepository.convertToReservations(basket.id, userId)

      res.status(200).json({
        message: "Reservations confirmed successfully",
        reservations,
      })
    } catch (error) {
      next(error)
    }
  },
}
