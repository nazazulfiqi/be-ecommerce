import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

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

export { Cart };
