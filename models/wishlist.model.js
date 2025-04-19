// wishlist.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

const Wishlist = sequelize.define(
  "Wishlist",
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "wishlists",
    underscored: true,
    timestamps: true,
  }
);

// Jangan buat asosiasi di sini
export { Wishlist };
