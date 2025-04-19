import { Cart } from "../models/cart.model.js";
import { CartItem } from "../models/cartItem.model.js";
import { Product } from "../models/product.model.js";

export const CartService = {
  async getOrCreateCart(userId) {
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }
    return cart;
  },

  async addToCart(userId, productId, quantity = 1) {
    const cart = await this.getOrCreateCart(userId);

    const existingItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: productId,
      },
    });

    if (existingItem) {
      // Tambah quantity jika sudah ada
      existingItem.quantity += Number(quantity) || 1;
      await existingItem.save();
      return existingItem;
    }

    // Tambah item baru ke cart
    const newItem = await CartItem.create({
      cart_id: cart.id,
      product_id: productId,
      quantity: Number(quantity) || 1,
    });

    return newItem;
  },

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

  async updateQuantity(userId, productId, quantity) {
    const cart = await this.getOrCreateCart(userId);

    const item = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: productId,
      },
    });

    if (!item) {
      throw new Error("Product not found in cart");
    }

    item.quantity = Number(quantity);
    await item.save();

    return item;
  },
};
