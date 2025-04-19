import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import addressRoutes from "./routes/address.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import { setupAssociations } from "./models/associations.js";

dotenv.config();
const app = express();
app.use(express.json());

setupAssociations();
// Gunakan rute yang sudah ada
app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlists", wishlistRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
