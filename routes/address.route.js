import express from "express";
import { AddressController } from "../controllers/address.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js"; // ✅ sesuai export

const router = express.Router();

router.post("/", authenticate, AddressController.create);
router.get("/", authenticate, AddressController.findAll);
router.get("/:id", authenticate, AddressController.findOne);
router.put("/:id", authenticate, AddressController.update);
router.delete("/:id", authenticate, AddressController.delete);

export default router;
