import { Product } from "../models/product.model.js";
import { ProductImage } from "../models/productImage.model.js";

export const ProductService = {
  async create(data, images = []) {
    const product = await Product.create(data);
    if (images.length > 0) {
      const imgData = images.map((url, idx) => ({
        product_id: product.id,
        image_url: url,
        is_main: idx === 0,
      }));
      await ProductImage.bulkCreate(imgData);
    }
    return product;
  },

  async findAllProducts() {
    return Product.findAll({ include: ["images"] });
  },
  async findProductById(id) {
    return Product.findByPk(id, { include: ["images"] });
  },
};
