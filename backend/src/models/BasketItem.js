import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"
import Basket from "./Basket.js"

const BasketItem = sequelize.define("BasketItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  itemType: {
    type: DataTypes.ENUM("room", "event", "service"),
    allowNull: false,
  },
  itemId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  specialRequests: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
})

// Define associations
BasketItem.belongsTo(Basket)
Basket.hasMany(BasketItem)

export default BasketItem
