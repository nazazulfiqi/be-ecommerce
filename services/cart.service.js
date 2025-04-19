import { Cart } from "../models/cart.model.js";
import { CartItem } from "../models/cartItem.model.js";
import { Product } from "../models/product.model.js";

export const CartService = {
  // Membuat cart baru atau mengambil cart yang sudah ada untuk pengguna
  async getOrCreateCart(userId) {
    let cart = await Cart.findOne({
      where: { user_id: userId },
    });

    // Jika tidak ada cart, buat cart baru
    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
      });
    }

    return cart;
  },

  // Menambah produk ke dalam cart
  async addToCart(userId, productId, quantity) {
    const cart = await this.getOrCreateCart(userId);

    // Cek apakah produk sudah ada dalam cart
    const exist = await CartItem.findOne({
      where: { cart_id: cart.id, product_id: productId },
    });

    if (exist) {
      // Update quantity jika produk sudah ada di cart
      exist.quantity += quantity;
      await exist.save();
      return exist;
    }

    // Jika produk belum ada, tambah produk ke cart
    const cartItem = await CartItem.create({
      cart_id: cart.id,
      product_id: productId,
      quantity: quantity,
    });

    return cartItem;
  },

  // Mengambil semua item dalam cart
  async getCartItems(userId) {
    const cart = await this.getOrCreateCart(userId);

    const items = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
    });

    return items;
  },

  // Menghapus produk dari cart
  async removeFromCart(userId, productId) {
    const cart = await this.getOrCreateCart(userId);

    const deleted = await CartItem.destroy({
      where: {
        cart_id: cart.id,
        product_id: productId,
      },
    });

    if (deleted === 0) {
      throw new Error("Product not found in cart");
    }

    return deleted;
  },

  // Mengupdate jumlah produk dalam cart
  async updateQuantity(userId, productId, quantity) {
    const cart = await this.getOrCreateCart(userId);

    const cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id: productId },
    });

    if (!cartItem) {
      throw new Error("Product not found in cart");
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return cartItem;
  },
};
