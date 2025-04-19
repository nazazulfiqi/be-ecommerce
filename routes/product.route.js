import express from "express";
import multer from "multer";
import { ProductController } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  authenticate,
  upload.array("image", 5),
  ProductController.create
);

router.get("/", authenticate, ProductController.findAll); // public access
router.get("/:id", authenticate, ProductController.findOne);
router.put(
  "/:id",
  authenticate,
  upload.array("image", 5), // Ganti dari .single ke .array
  ProductController.update
);
router.delete("/:id", authenticate, ProductController.delete);

export default router;
