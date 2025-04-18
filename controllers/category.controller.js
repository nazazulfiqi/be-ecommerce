import { CategoryService } from "../services/category.service.js";
import ResponseDTO from "../dto/response.dto.js";

export const CategoryController = {
  async create(req, res) {
    try {
      const { name, parent_id } = req.body;

      if (!name) {
        return res
          .status(422)
          .json(ResponseDTO.error("Field 'name' is required", res.statusCode));
      }

      return res
        .status(201)
        .json(ResponseDTO.success("Category created successfully"));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
  async findAll(req, res) {
    try {
      const categories = await CategoryService.findAll();
      return res.json(ResponseDTO.success("Categories retrieved", categories));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async findOne(req, res) {
    try {
      const category = await CategoryService.findById(req.params.id);
      if (!category) {
        return res.status(404).json(ResponseDTO.notFound("Category not found"));
      }
      return res.json(ResponseDTO.success("Category found", category));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async update(req, res) {
    try {
      const { name, parent_id } = req.body;

      if (!name) {
        return res
          .status(422)
          .json(ResponseDTO.error("Field 'name' is required", res.statusCode));
      }

      const updated = await CategoryService.update(req.params.id, req.body);
      if (updated[0] === 0) {
        return res
          .status(404)
          .json(ResponseDTO.notFound("Category not found or unchanged"));
      }
      return res.json(ResponseDTO.success("Category updated"));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },

  async delete(req, res) {
    try {
      const deleted = await CategoryService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json(ResponseDTO.notFound("Category not found"));
      }
      return res.json(ResponseDTO.success("Category deleted"));
    } catch (err) {
      return res.status(500).json(ResponseDTO.error(err.message));
    }
  },
};
