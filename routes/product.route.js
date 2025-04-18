import express from "express";
import multer from "multer";
import { ProductController } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  authenticate,
  upload.single("image"),
  ProductController.create
);
router.get("/", authenticate, ProductController.findAll); // public access
router.get("/:id", authenticate, ProductController.findOne);
router.put(
  "/:id",
  authenticate,
  upload.single("image"),
  ProductController.update
);

export default router;
