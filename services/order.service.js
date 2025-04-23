// services/order.service.js
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { CartService } from "./cart.service.js";
import { sequelize } from "../config/sequelize.js";
import { CartItem } from "../models/cartItem.model.js";
import { Voucher } from "../models/voucher.model.js";

export const OrderService = {
  async createOrder(
    userId,
    addressId,
    productIds = [],
    shippingFee = 10000,
    voucherCode = null
  ) {
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

    let totalPrice = selectedItems.reduce(
      (total, item) => total + item.quantity * parseFloat(item.product.price),
      0
    );

    let appliedVoucher = null;
    let discountAmount = 0; // Initialize discountAmount

    if (voucherCode) {
      const voucher = await Voucher.findOne({ where: { code: voucherCode } });

      if (voucher) {
        const isValid =
          new Date() < new Date(voucher.expired_at) &&
          totalPrice >= voucher.min_purchase;

        if (isValid) {
          discountAmount = (voucher.discount_percent / 100) * totalPrice;
          discountAmount = Math.min(discountAmount, voucher.max_discount);

          totalPrice -= discountAmount;
          appliedVoucher = voucher;
        }
      }
    }

    const t = await sequelize.transaction();

    try {
      const order = await Order.create(
        {
          user_id: userId,
          address_id: addressId,
          total_price: totalPrice,
          shipping_fee: shippingFee,
          discount_amount: discountAmount,
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

      if (appliedVoucher) {
        // Menambahkan voucher yang digunakan ke order_vouchers
        await order.addVoucher(appliedVoucher, { transaction: t });
      }

      await CartItem.destroy({
        where: {
          cart_id: cart.id,
          product_id: selectedItems.map((item) => item.product_id),
        },
        transaction: t,
      });

      await t.commit();

      // Return order without discount_amount, just return the order and applied voucher
      return {
        ...order.toJSON(),
        voucher: appliedVoucher ? appliedVoucher.toJSON() : null,
      };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
  async getOrders(userId) {
    return await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: { association: "product" },
        },
        {
          model: Voucher, // Include the voucher model
          as: "vouchers", // Assuming the association is set as "vouchers"
          attributes: ["code"], // Only include the voucher code field
          through: { attributes: [] },
        },
      ],
      order: [["created_at", "DESC"]],
    });
  },
};
