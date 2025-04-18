import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { User } from "./user.model.js";

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    label: DataTypes.STRING,
    recipient_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    detail_address: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    tableName: "addresses",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relasi ke User
Address.belongsTo(User, { foreignKey: "user_id", as: "user" });

export { Address };
