// associations.js
import { Wishlist } from "./wishlist.model.js";
import { Product } from "./product.model.js";

export function setupAssociations() {
  // Pastikan asosiasi terjadi setelah kedua model dimuat
  Wishlist.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Product.hasMany(Wishlist, { foreignKey: "product_id", as: "wishlists" });
}
