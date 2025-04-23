// models/orderVoucher.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Order } from "./order.model.js";
import { Voucher } from "./voucher.model.js";

export const OrderVoucher = sequelize.define(
  "OrderVoucher",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    voucher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "vouchers",
        key: "id",
      },
    },
  },
  {
    tableName: "order_vouchers",
    underscored: true,
  }
);
