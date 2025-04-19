import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Product } from "./product.model.js"; // Import Product model

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "cart_items",
    underscored: true,
    timestamps: true,
  }
);

// Asosiasi antara CartItem dan Product
CartItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

export { CartItem };
