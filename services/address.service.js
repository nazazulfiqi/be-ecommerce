import { Address } from "../models/address.model.js";

export const AddressService = {
  async createAddress(userId, payload) {
    return await Address.create({ user_id: userId, ...payload });
  },

  async getAddressesByUser(userId) {
    return await Address.findAll({ where: { user_id: userId } });
  },

  async getAddressById(addressId, userId) {
    try {
      const address = await Address.findOne({
        where: {
          id: addressId,
          user_id: userId,
        },
      });

      return address;
    } catch (err) {
      throw new Error("Error retrieving address: " + err.message);
    }
  },

  async updateAddress(addressId, updatedData, userId) {
    try {
      const [updatedRowCount] = await Address.update(updatedData, {
        where: {
          id: addressId,
          user_id: userId,
        },
      });

      return [updatedRowCount];
    } catch (err) {
      throw new Error("Error updating address: " + err.message);
    }
  },

  async deleteAddress(addressId, userId) {
    try {
      const deletedCount = await Address.destroy({
        where: {
          id: addressId,
          user_id: userId,
        },
      });

      return deletedCount > 0;
    } catch (err) {
      throw new Error("Error deleting address: " + err.message);
    }
  },
};
