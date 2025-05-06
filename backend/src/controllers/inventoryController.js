import { inventoryRepository } from "../repositories/inventoryRepository.js"

export const inventoryController = {
  getAllItems: async (req, res, next) => {
    try {
      const { category, lowStock } = req.query
      const options = { where: {} }

      if (category) {
        options.where.category = category
      }

      if (lowStock === "true") {
        // Find items with quantity below minimum quantity
        const items = await inventoryRepository.findAll()
        const lowStockItems = items.filter((item) => item.quantity <= item.minQuantity)
        return res.status(200).json(lowStockItems)
      }

      const items = await inventoryRepository.findAll(options)
      res.status(200).json(items)
    } catch (error) {
      next(error)
    }
  },

  getItemById: async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await inventoryRepository.findById(id)

      if (!item) {
        return res.status(404).json({ message: "Inventory item not found" })
      }

      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  },

  createItem: async (req, res, next) => {
    try {
      const itemData = req.body
      const newItem = await inventoryRepository.create(itemData)
      res.status(201).json(newItem)
    } catch (error) {
      next(error)
    }
  },

  updateItem: async (req, res, next) => {
    try {
      const { id } = req.params
      const itemData = req.body
      const updatedItem = await inventoryRepository.update(id, itemData)

      if (!updatedItem) {
        return res.status(404).json({ message: "Inventory item not found" })
      }

      res.status(200).json(updatedItem)
    } catch (error) {
      next(error)
    }
  },

  deleteItem: async (req, res, next) => {
    try {
      const { id } = req.params
      const deleted = await inventoryRepository.delete(id)

      if (!deleted) {
        return res.status(404).json({ message: "Inventory item not found" })
      }

      res.status(204).end()
    } catch (error) {
      next(error)
    }
  },

  updateQuantity: async (req, res, next) => {
    try {
      const { id } = req.params
      const { quantity, operation } = req.body

      if (!["add", "subtract"].includes(operation)) {
        return res.status(400).json({ message: "Operation must be 'add' or 'subtract'" })
      }

      const item = await inventoryRepository.findById(id)
      if (!item) {
        return res.status(404).json({ message: "Inventory item not found" })
      }

      let newQuantity = item.quantity
      if (operation === "add") {
        newQuantity += Number.parseInt(quantity)
      } else {
        newQuantity -= Number.parseInt(quantity)
        if (newQuantity < 0) {
          return res.status(400).json({ message: "Cannot reduce quantity below zero" })
        }
      }

      const updatedItem = await inventoryRepository.update(id, { quantity: newQuantity })
      res.status(200).json(updatedItem)
    } catch (error) {
      next(error)
    }
  },
}
