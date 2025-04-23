// models/voucher.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Order } from "./order.model.js";

const Voucher = sequelize.define(
  "Voucher",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discount_percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_purchase: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "vouchers",
    underscored: true,
  }
);

export { Voucher };
