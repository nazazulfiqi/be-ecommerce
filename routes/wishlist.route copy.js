import express from "express";
import { WishlistController } from "../controllers/wishlist.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Endpoint untuk menambah produk ke wishlist, membutuhkan autentikasi
router.post("/", authenticate, WishlistController.add);

// Endpoint untuk mendapatkan semua produk dalam wishlist, membutuhkan autentikasi
router.get("/", authenticate, WishlistController.getAll);

// Endpoint untuk menghapus produk dari wishlist, membutuhkan autentikasi
router.delete("/:product_id", authenticate, WishlistController.remove);

export default router;
