import { CartService } from "../services/cart.service.js";
import ResponseDTO from "../dto/response.dto.js";

export const CartController = {
  // Menambah produk ke dalam cart
  async add(req, res) {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.body;

      const cartItem = await CartService.addToCart(
        userId,
        product_id,
        quantity
      );
      return res
        .status(201)
        .json(ResponseDTO.success("Product added to cart", cartItem));
    } catch (err) {
      return res.status(400).json(ResponseDTO.error(err.message));
    }
  },

  // Mengambil semua item dalam cart
  async getAll(req, res) {
    try {
      const userId = req.user.id;

      const cartItems = await CartService.getCartItems(userId);
      return res
        .status(200)
        .json(ResponseDTO.success("Cart retrieved", cartItems));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  // Menghapus produk dari cart
  async remove(req, res) {
    try {
      const userId = req.user.id;
      const { product_id } = req.params;

      await CartService.removeFromCart(userId, product_id);

      return res
        .status(200)
        .json(ResponseDTO.success("Product removed from cart"));
    } catch (err) {
      return res.status(400).json(ResponseDTO.error(err.message));
    }
  },

  // Mengupdate jumlah produk dalam cart
  async updateQuantity(req, res) {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.body;

      const updatedItem = await CartService.updateQuantity(
        userId,
        product_id,
        quantity
      );
      return res
        .status(200)
        .json(ResponseDTO.success("Cart item quantity updated", updatedItem));
    } catch (err) {
      return res.status(400).json(ResponseDTO.error(err.message));
    }
  },
};
