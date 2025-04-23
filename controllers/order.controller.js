// controllers/order.controller.js
import { OrderService } from "../services/order.service.js";
import ResponseDTO from "../dto/response.dto.js";

export const OrderController = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { address_id, product_ids, voucher_code } = req.body;

      const order = await OrderService.createOrder(
        userId,
        address_id,
        product_ids,
        10000, // shipping fee default
        voucher_code // voucher code ditambahkan ke service
      );
      return res.status(201).json(ResponseDTO.success("Order created", order));
    } catch (err) {
      return res.status(400).json(ResponseDTO.error(err.message));
    }
  },
  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const orders = await OrderService.getOrders(userId);
      return res
        .status(200)
        .json(ResponseDTO.success("Orders retrieved", orders));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
};
