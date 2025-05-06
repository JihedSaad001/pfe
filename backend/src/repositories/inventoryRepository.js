import InventoryItem from "../models/InventoryItem.js"

export const inventoryRepository = {
  findAll: async (options = {}) => {
    return await InventoryItem.findAll(options)
  },

  findById: async (id) => {
    return await InventoryItem.findByPk(id)
  },

  findByCategory: async (category) => {
    return await InventoryItem.findAll({ where: { category } })
  },

  findLowStock: async () => {
    const items = await InventoryItem.findAll()
    return items.filter((item) => item.quantity <= item.minQuantity)
  },

  create: async (itemData) => {
    return await InventoryItem.create(itemData)
  },

  update: async (id, itemData) => {
    const item = await InventoryItem.findByPk(id)
    if (item) {
      return await item.update(itemData)
    }
    return null
  },

  delete: async (id) => {
    const item = await InventoryItem.findByPk(id)
    if (item) {
      await item.destroy()
      return true
    }
    return false
  },
}
