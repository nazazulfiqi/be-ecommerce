import slugify from "slugify";
import { Product } from "../models/product.model.js";
import { ProductImage } from "../models/productImage.model.js";

export const ProductService = {
  async generateSlug(name) {
    let baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await Product.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  },
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

  async deleteProduct(id) {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.destroy();
    return true;
  },
};
