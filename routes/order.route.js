// routes/order.route.js
import express from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, OrderController.create);
router.get("/", authenticate, OrderController.getAll);

export default router;
