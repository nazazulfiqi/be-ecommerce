// product.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Category } from "./category.model.js";

// Product model
const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(12, 2) },
    stock: { type: DataTypes.INTEGER },
    brand: { type: DataTypes.STRING },
    category_id: { type: DataTypes.INTEGER },
  },
  {
    tableName: "products",
    underscored: true,
    timestamps: true,
  }
);

// Product associations
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Don't create the relation here; do it in a separate setup function.
export { Product };
