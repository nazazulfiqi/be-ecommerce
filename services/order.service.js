// services/order.service.js
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { CartService } from "./cart.service.js";
import { sequelize } from "../config/sequelize.js";
import { CartItem } from "../models/cartItem.model.js";

export const OrderService = {
  async createOrder(userId, addressId, productIds = [], shippingFee = 10000) {
    if (!Array.isArray(productIds) || productIds.length === 0) {
      throw new Error("No products selected for checkout");
    }

    const cart = await CartService.getOrCreateCart(userId);
    const cartItems = await CartService.getCartItems(userId);

    const selectedItems = cartItems.filter(
      (item) => productIds.includes(item.product_id) && item.product !== null
    );

    if (!selectedItems.length)
      throw new Error("Selected products are not in cart or unavailable");

    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.quantity * parseFloat(item.product.price),
      0
    );

    const t = await sequelize.transaction();

    try {
      const order = await Order.create(
        {
          user_id: userId,
          address_id: addressId,
          total_price: totalPrice,
          shipping_fee: shippingFee,
        },
        { transaction: t }
      );

      const orderItems = selectedItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: item.product.price,
      }));

      await OrderItem.bulkCreate(orderItems, { transaction: t });

      // Hapus item yang sudah dipesan dari cart
      const selectedProductIds = selectedItems.map((item) => item.product_id);
      await CartItem.destroy({
        where: {
          cart_id: cart.id,
          product_id: selectedProductIds,
        },
        transaction: t,
      });

      await t.commit();

      return order;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
  async getOrders(userId) {
    return await Order.findAll({
      where: { user_id: userId },
      include: {
        model: OrderItem,
        as: "items",
        include: { association: "product" },
      },
      order: [["created_at", "DESC"]],
    });
  },
};
