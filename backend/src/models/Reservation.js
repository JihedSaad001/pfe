import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"
import Room from "./Room.js"
import User from "./User.js"

const Reservation = sequelize.define("Reservation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  checkInDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  numberOfGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled", "completed"),
    defaultValue: "pending",
  },
  specialRequests: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
})

// Define associations
Reservation.belongsTo(Room)
Reservation.belongsTo(User)

export default Reservation
