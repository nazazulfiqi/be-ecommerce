// services/voucher.service.js
import { Voucher } from "../models/voucher.model.js";

export const VoucherService = {
  async create(data) {
    return await Voucher.create(data);
  },

  async getAll() {
    return await Voucher.findAll();
  },

  async getByCode(code) {
    return await Voucher.findOne({ where: { code } });
  },

  async delete(id) {
    return await Voucher.destroy({ where: { id } });
  },

  async update(id, data) {
    const voucher = await Voucher.findByPk(id);
    if (!voucher) return null;

    await voucher.update(data);
    return voucher;
  },
};
