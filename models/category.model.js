import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "categories",
    underscored: true,
    timestamps: true,
  }
);

export { Category };
