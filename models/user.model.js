import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/sequelize.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      defaultValue: "customer",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    tableName: "users", // Pastikan sesuai dengan nama tabel di database
    timestamps: false, // Nonaktifkan penggunaan createdAt dan updatedAt default
    createdAt: "created_at", // Menetapkan nama kolom sesuai dengan migrasi
    updatedAt: "updated_at", // Menetapkan nama kolom sesuai dengan migrasi
  }
);

export { User };
