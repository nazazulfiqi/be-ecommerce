// associations.js
import { Wishlist } from "./wishlist.model.js";
import { Product } from "./product.model.js";
import { Order } from "./order.model.js";
import { OrderItem } from "./orderItem.model.js";
import { Voucher } from "./voucher.model.js";
import { OrderVoucher } from "./orderVoucher.js";

export function setupAssociations() {
  // Wishlist <-> Product
  Wishlist.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Product.hasMany(Wishlist, { foreignKey: "product_id", as: "wishlists" });

  // Order <-> OrderItem
  Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id" });

  // OrderItem <-> Product
  OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Product.hasMany(OrderItem, { foreignKey: "product_id", as: "order_items" });

  // ✅ Order <-> Voucher (Many-to-Many)
  Order.belongsToMany(Voucher, {
    through: OrderVoucher,
    foreignKey: "order_id",
    otherKey: "voucher_id",
    as: "vouchers",
  });

  Voucher.belongsToMany(Order, {
    through: OrderVoucher,
    foreignKey: "voucher_id",
    otherKey: "order_id",
    as: "orders",
  });
}
