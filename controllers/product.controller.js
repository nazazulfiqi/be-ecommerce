import { Product } from "../models/product.model.js";
import { ProductImage } from "../models/productImage.model.js";
import { ProductService } from "../services/product.service.js";
import ResponseDTO from "../dto/response.dto.js";
import { uploadImage } from "../utils/cloudinary.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { Category } from "../models/category.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ProductController = {
  // Create new product
  async create(req, res) {
    try {
      const { name, description, price, stock, brand, category_id } = req.body;

      const slug = await ProductService.generateSlug(name);

      // Upload image if provided
      let imageUrls = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const uploadResult = await uploadImage(file.path, file.filename);
          imageUrls.push(uploadResult.secure_url);
          fs.unlinkSync(file.path);
        }
      }

      // Create new product
      const newProduct = await Product.create({
        name,
        slug,
        description,
        price,
        stock,
        brand,
        category_id,
        image_url: imageUrls[0] || null, // pakai image pertama sebagai thumbnail
      });

      // Simpan semua image ke ProductImage
      if (imageUrls.length > 0) {
        const imgData = imageUrls.map((url, idx) => ({
          product_id: newProduct.id,
          image_url: url,
          is_main: idx === 0,
        }));
        await ProductImage.bulkCreate(imgData);
      }

      return res
        .status(201)
        .json(ResponseDTO.success("Product created", newProduct));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  // Get All Products
  async findAll(req, res) {
    try {
      const products = await ProductService.findAllProducts();

      const mappedProducts = products.map((product) => {
        const productJSON = product.toJSON();
        const mainImage = productJSON.images.find((img) => img.is_main);
        return {
          ...productJSON,
          main_image_url: mainImage ? mainImage.image_url : null,
        };
      });

      return res.json(ResponseDTO.success("All products", mappedProducts));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
  // Get Product by ID
  // Get Product by ID
  async findOne(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: ProductImage,
            as: "images", // pastikan ini sesuai alias di relasi
          },
          {
            model: Category,
            as: "category", // alias juga
            attributes: ["id", "name"],
          },
        ],
      });

      if (!product) {
        return res.status(404).json(ResponseDTO.notFound("Product not found"));
      }

      // Convert the product instance to a plain object
      const productJSON = product.toJSON();

      // Remove the 'category' field and add 'category_name'
      const { category, ...restProductData } = productJSON;

      return res.status(200).json(
        ResponseDTO.success("Product found", {
          ...restProductData,
          category_name: category?.name || null,
        })
      );
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
  // Update Product
  async update(req, res) {
    try {
      const { name, description, price, stock, brand, category_id } = req.body;

      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json(ResponseDTO.notFound("Product not found"));
      }

      let slug = product.slug;
      if (name && name !== product.name) {
        slug = await ProductService.generateSlug(name);
      }

      let imageUrls = [];

      // Upload new images if provided
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const uploadResult = await uploadImage(file.path, file.filename);
          imageUrls.push(uploadResult.secure_url);
          fs.unlinkSync(file.path);
        }
      }

      // Gunakan gambar pertama sebagai thumbnail jika ada gambar baru
      const imageUrl = imageUrls.length > 0 ? imageUrls[0] : product.image_url;

      const updatedProduct = await product.update({
        name,
        slug,
        description,
        price,
        stock,
        brand,
        category_id,
        image_url: imageUrl,
      });

      // Simpan gambar baru ke product_images jika ada
      if (imageUrls.length > 0) {
        await ProductImage.destroy({
          where: { product_id: updatedProduct.id },
        }); // opsional
        const imgData = imageUrls.map((url, idx) => ({
          product_id: updatedProduct.id,
          image_url: url,
          is_main: idx === 0,
        }));
        await ProductImage.bulkCreate(imgData);
      }

      return res
        .status(200)
        .json(ResponseDTO.success("Product updated", updatedProduct));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  // Delete Product
  async delete(req, res) {
    try {
      const productId = req.params.id;

      // Cari produk berdasarkan ID
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json(ResponseDTO.notFound("Product not found"));
      }

      // Hapus produk
      await product.destroy();

      return res
        .status(200)
        .json(ResponseDTO.success("Product successfully deleted"));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
};
