import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Product } from "./product.model.js";

const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING },
    is_main: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "product_images",
    underscored: true,
    timestamps: true,
  }
);

ProductImage.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });

export { ProductImage };
