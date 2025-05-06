import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"
import InventoryItem from "./InventoryItem.js"

const Basket = sequelize.define("Basket", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  CreationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})
Basket.belongsTo(User)
Basket.belongsTo(InventoryItem)
export default Basket
