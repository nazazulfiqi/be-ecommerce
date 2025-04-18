import { AddressService } from "../services/address.service.js";
import ResponseDTO from "../dto/response.dto.js";

export const AddressController = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const address = await AddressService.createAddress(userId, req.body);
      return res
        .status(201)
        .json(ResponseDTO.success("Address created", address));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async findAll(req, res) {
    try {
      const userId = req.user.id;
      const addresses = await AddressService.getAddressesByUser(userId);
      return res.json(ResponseDTO.success("Addresses retrieved", addresses));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async findOne(req, res) {
    try {
      const address = await AddressService.getAddressById(req.params.id);
      if (!address)
        return res.status(404).json(ResponseDTO.notFound("Address not found"));
      return res.json(ResponseDTO.success("Address found", address));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async update(req, res) {
    try {
      const updated = await AddressService.updateAddress(
        req.params.id,
        req.body
      );
      if (updated[0] === 0)
        return res
          .status(404)
          .json(ResponseDTO.notFound("Address not found or unchanged"));
      return res.json(ResponseDTO.success("Address updated"));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async delete(req, res) {
    try {
      const deleted = await AddressService.deleteAddress(req.params.id);
      if (!deleted)
        return res.status(404).json(ResponseDTO.notFound("Address not found"));
      return res.json(ResponseDTO.success("Address deleted"));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
};
