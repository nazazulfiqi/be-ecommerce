// controllers/voucher.controller.js
import { VoucherService } from "../services/voucher.service.js";
import ResponseDTO from "../dto/response.dto.js";

export const VoucherController = {
  async create(req, res) {
    try {
      const voucher = await VoucherService.create(req.body);
      return res
        .status(201)
        .json(ResponseDTO.success("Voucher created", voucher));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async list(req, res) {
    try {
      const vouchers = await VoucherService.getAll();
      return res.status(200).json(ResponseDTO.success("Vouchers", vouchers));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async check(req, res) {
    try {
      const { code } = req.params;
      const voucher = await VoucherService.getByCode(code);
      if (!voucher)
        return res.status(404).json(ResponseDTO.error("Voucher not found"));

      const isExpired = new Date(voucher.expired_at) < new Date();
      if (isExpired)
        return res.status(400).json(ResponseDTO.error("Voucher expired"));

      return res
        .status(200)
        .json(ResponseDTO.success("Voucher valid", voucher));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await VoucherService.delete(id);
      return res.status(200).json(ResponseDTO.success("Voucher deleted"));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { code, discount_percent, max_discount, min_purchase, expired_at } =
        req.body;

      const updatedVoucher = await VoucherService.update(id, {
        code,
        discount_percent,
        max_discount,
        min_purchase,
        expired_at,
      });

      if (!updatedVoucher) {
        return res.status(404).json(ResponseDTO.error("Voucher not found"));
      }

      return res
        .status(200)
        .json(ResponseDTO.success("Voucher updated", updatedVoucher));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
};
