import express from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, CategoryController.create);
router.get("/", CategoryController.findAll); // public access
router.get("/:id", CategoryController.findOne);
router.put("/:id", authenticate, CategoryController.update);
router.delete("/:id", authenticate, CategoryController.delete);

export default router;
