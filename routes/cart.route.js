import express from "express";
import { CartController } from "../controllers/cart.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Endpoint untuk menambah produk ke dalam cart
router.post("/", authenticate, CartController.add);

// Endpoint untuk mengambil semua item dalam cart
router.get("/", authenticate, CartController.getAll);

// Endpoint untuk menghapus produk dari cart
router.delete("/:product_id", authenticate, CartController.remove);

// Endpoint untuk mengupdate jumlah produk dalam cart
router.put("/update-quantity", authenticate, CartController.updateQuantity);

export default router;
