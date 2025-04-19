import { WishlistService } from "../services/wishlist.service.js";
import ResponseDTO from "../dto/response.dto.js";

export const WishlistController = {
  // Menambah produk ke wishlist
  async add(req, res) {
    try {
      const userId = req.user.id;
      const { product_id } = req.body;

      const wishlist = await WishlistService.addToWishlist(userId, product_id);
      return res
        .status(201)
        .json(ResponseDTO.success("Product added to wishlist", wishlist));
    } catch (err) {
      return res
        .status(400)
        .json(ResponseDTO.error(err.message, res.statusCode));
    }
  },

  // Mengambil semua produk di wishlist
  // wishlist.controller.js
  async getAll(req, res) {
    try {
      const userId = req.user.id;

      const wishlist = await WishlistService.getWishlist(userId);

      if (!wishlist || wishlist.length === 0) {
        return res
          .status(200)
          .json(ResponseDTO.success("No products in wishlist", []));
      }

      return res
        .status(200)
        .json(ResponseDTO.success("Wishlist retrieved", wishlist));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
  // Menghapus produk dari wishlist
  async remove(req, res) {
    try {
      const userId = req.user.id;
      const { product_id } = req.params;

      await WishlistService.removeFromWishlist(userId, product_id);

      return res
        .status(200)
        .json(ResponseDTO.success("Product removed from wishlist"));
    } catch (err) {
      return res
        .status(400)
        .json(ResponseDTO.error(err.message, res.statusCode));
    }
  },
};
