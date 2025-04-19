import { Product } from "../models/product.model.js";
import { Wishlist } from "../models/wishlist.model.js";

export const WishlistService = {
  // Menambahkan produk ke wishlist
  async addToWishlist(userId, productId) {
    // Cek apakah produk sudah ada di wishlist
    const exist = await Wishlist.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (exist) {
      throw new Error("Product already in wishlist");
    }

    // Menambahkan produk ke wishlist
    const wishlist = await Wishlist.create({
      user_id: userId,
      product_id: productId,
    });

    return wishlist;
  },

  // Mengambil semua produk di wishlist berdasarkan user ID
  async getWishlist(userId) {
    const items = await Wishlist.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
    });

    return items;
  },

  // Menghapus produk dari wishlist
  async removeFromWishlist(userId, productId) {
    const deleted = await Wishlist.destroy({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (deleted === 0) {
      throw new Error("Product not found in wishlist");
    }

    return deleted;
  },
};
