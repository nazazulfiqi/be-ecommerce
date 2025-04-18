import { Product } from "../models/product.model.js";
import { ProductImage } from "../models/productImage.model.js";
import { ProductService } from "../services/product.service.js";
import ResponseDTO from "../dto/response.dto.js";
import { uploadImage } from "../utils/cloudinary.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ProductController = {
  // Create new product
  async create(req, res) {
    try {
      const { name, slug, description, price, stock, brand, category_id } =
        req.body;

      // Upload image if provided
      let imageUrl;
      if (req.file) {
        const uploadResult = await uploadImage(
          req.file.path,
          req.file.filename
        );
        imageUrl = uploadResult.secure_url;

        // Remove the uploaded image file after uploading to Cloudinary
        fs.unlinkSync(req.file.path);
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
        image_url: imageUrl, // Assign image_url to the product (first image)
      });

      // Save the product image in product_images table
      if (imageUrl) {
        await ProductImage.create({
          product_id: newProduct.id,
          image_url: imageUrl,
          is_main: true, // Set as the main image
        });
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
  async findOne(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: ProductImage, // Include related images
      });

      if (!product) {
        return res.status(404).json(ResponseDTO.notFound("Product not found"));
      }

      return res
        .status(200)
        .json(ResponseDTO.success("Product found", product));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  // Update Product
  async update(req, res) {
    try {
      const { name, slug, description, price, stock, brand, category_id } =
        req.body;

      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json(ResponseDTO.notFound("Product not found"));
      }

      let imageUrl = product.image_url; // Keep the current image if no new image uploaded
      if (req.file) {
        const uploadResult = await uploadImage(
          req.file.path,
          req.file.filename
        );
        imageUrl = uploadResult.secure_url;

        // Remove the uploaded image file after uploading to Cloudinary
        fs.unlinkSync(path.join(__dirname, "..", "uploads", req.file.filename));
      }

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

      // Save new product image in product_images table if imageUrl is updated
      if (req.file && imageUrl !== product.image_url) {
        await ProductImage.create({
          product_id: updatedProduct.id,
          image_url: imageUrl,
          is_main: true, // Set as the main image
        });
      }

      return res
        .status(200)
        .json(ResponseDTO.success("Product updated", updatedProduct));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
};
