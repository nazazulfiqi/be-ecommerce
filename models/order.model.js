// models/order.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Voucher } from "./voucher.model.js";

const Order = sequelize.define(
  "Order",
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
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "paid",
        "shipped",
        "delivered",
        "canceled"
      ),
      defaultValue: "pending",
    },
    total_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    shipping_fee: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    discount_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true, // Kolom ini optional
    },
  },
  {
    tableName: "orders",
    underscored: true,
    timestamps: true,
  }
);

export { Order };
