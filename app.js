import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import addressRoutes from "./routes/address.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
