import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { CartItem } from "./cartItem.model.js"; // Import CartItem model

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "carts",
    underscored: true,
    timestamps: true,
  }
);

// Asosiasi antara Cart dan CartItem
Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "items" });

export { Cart };
