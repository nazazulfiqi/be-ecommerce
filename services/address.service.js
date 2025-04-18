import { Address } from "../models/address.model.js";

export const AddressService = {
  async createAddress(userId, payload) {
    return await Address.create({ user_id: userId, ...payload });
  },

  async getAddressesByUser(userId) {
    return await Address.findAll({ where: { user_id: userId } });
  },

  async getAddressById(id) {
    return await Address.findByPk(id);
  },

  async updateAddress(id, payload) {
    return await Address.update(payload, { where: { id } });
  },

  async deleteAddress(id) {
    return await Address.destroy({ where: { id } });
  },
};
