import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import addressRoutes from "./routes/address.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
