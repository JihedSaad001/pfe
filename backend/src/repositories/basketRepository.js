import Basket from "../models/Basket.js"
import BasketItem from "../models/BasketItem.js"
import User from "../models/User.js"
import Room from "../models/Room.js"
import Reservation from "../models/Reservation.js"
import { sequelize } from "../config/database.js"

export const basketRepository = {
  findAll: async (options = {}) => {
    return await Basket.findAll({
      ...options,
      include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }, { model: BasketItem }],
    })
  },

  findById: async (id) => {
    return await Basket.findByPk(id, {
      include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }, { model: BasketItem }],
    })
  },

  findByUserId: async (userId) => {
    return await Basket.findOne({
      where: {
        UserId: userId,
        status: "active",
      },
      include: [{ model: BasketItem }],
      order: [["createdAt", "DESC"]],
    })
  },

  create: async (basketData) => {
    return await Basket.create(basketData)
  },

  update: async (id, basketData) => {
    const basket = await Basket.findByPk(id)
    if (basket) {
      return await basket.update(basketData)
    }
    return null
  },

  delete: async (id) => {
    const basket = await Basket.findByPk(id)
    if (basket) {
      await basket.destroy()
      return true
    }
    return false
  },

  // Basket item operations
  addItem: async (basketId, itemData) => {
    const transaction = await sequelize.transaction()

    try {
      // Get the basket
      const basket = await Basket.findByPk(basketId, { transaction })
      if (!basket) {
        throw new Error("Basket not found")
      }

      // Create the basket item
      const basketItem = await BasketItem.create(
        {
          ...itemData,
          BasketId: basketId,
        },
        { transaction },
      )

      // Update the basket total
      const totalAmount = Number.parseFloat(basket.totalAmount) + Number.parseFloat(itemData.price * itemData.quantity)
      await basket.update({ totalAmount }, { transaction })

      await transaction.commit()
      return basketItem
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  updateItem: async (itemId, itemData) => {
    const transaction = await sequelize.transaction()

    try {
      // Get the basket item
      const basketItem = await BasketItem.findByPk(itemId, { transaction })
      if (!basketItem) {
        throw new Error("Basket item not found")
      }

      // Get the basket
      const basket = await Basket.findByPk(basketItem.BasketId, { transaction })
      if (!basket) {
        throw new Error("Basket not found")
      }

      // Calculate price difference
      const oldTotal = Number.parseFloat(basketItem.price) * basketItem.quantity
      const newTotal =
        Number.parseFloat(itemData.price || basketItem.price) * (itemData.quantity || basketItem.quantity)
      const priceDifference = newTotal - oldTotal

      // Update the basket item
      await basketItem.update(itemData, { transaction })

      // Update the basket total
      const totalAmount = Number.parseFloat(basket.totalAmount) + priceDifference
      await basket.update({ totalAmount }, { transaction })

      await transaction.commit()
      return basketItem
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  removeItem: async (itemId) => {
    const transaction = await sequelize.transaction()

    try {
      // Get the basket item
      const basketItem = await BasketItem.findByPk(itemId, { transaction })
      if (!basketItem) {
        throw new Error("Basket item not found")
      }

      // Get the basket
      const basket = await Basket.findByPk(basketItem.BasketId, { transaction })
      if (!basket) {
        throw new Error("Basket not found")
      }

      // Calculate item total
      const itemTotal = Number.parseFloat(basketItem.price) * basketItem.quantity

      // Update the basket total
      const totalAmount = Number.parseFloat(basket.totalAmount) - itemTotal
      await basket.update({ totalAmount: Math.max(0, totalAmount) }, { transaction })

      // Delete the basket item
      await basketItem.destroy({ transaction })

      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  getBasketItems: async (basketId) => {
    return await BasketItem.findAll({
      where: { BasketId: basketId },
      order: [["createdAt", "ASC"]],
    })
  },

  clearBasket: async (basketId) => {
    const transaction = await sequelize.transaction()

    try {
      // Delete all basket items
      await BasketItem.destroy({
        where: { BasketId: basketId },
        transaction,
      })

      // Reset basket total
      await Basket.update({ totalAmount: 0 }, { where: { id: basketId }, transaction })

      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  convertToReservations: async (basketId, userId) => {
    const transaction = await sequelize.transaction()

    try {
      const basket = await Basket.findByPk(basketId, {
        include: [{ model: BasketItem }],
        transaction,
      })

      if (!basket) {
        throw new Error("Basket not found")
      }

      const reservations = []

      // Process each basket item
      for (const item of basket.BasketItems) {
        if (item.itemType === "room") {
          // Create a reservation for room
          const reservation = await Reservation.create(
            {
              RoomId: item.itemId,
              UserId: userId,
              checkInDate: item.startDate,
              checkOutDate: item.endDate,
              numberOfGuests: item.guests || 1,
              totalPrice: item.price,
              specialRequests: item.specialRequests,
              status: "confirmed",
            },
            { transaction },
          )

          // Update room status to occupied
          await Room.update(
            { status: "occupied" },
            {
              where: { id: item.itemId },
              transaction,
            },
          )

          reservations.push(reservation)
        }
        // Handle other item types if needed (events, services)
      }

      // Mark basket as converted
      await basket.update({ status: "converted" }, { transaction })

      await transaction.commit()
      return reservations
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
