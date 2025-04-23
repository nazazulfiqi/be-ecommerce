// routes/voucher.routes.js
import express from "express";
import { VoucherController } from "../controllers/voucher.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, VoucherController.create);
router.get("/", VoucherController.list);
router.get("/:code", VoucherController.check);
router.delete("/:id", authenticate, VoucherController.delete);
router.put("/:id", authenticate, VoucherController.update);

export default router;
