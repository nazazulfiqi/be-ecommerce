import Category from "../models/category.model.js";

export const CategoryService = {
  create: async (data) => {
    return await Category.create(data);
  },

  findAll: async () => {
    return await Category.findAll();
  },

  findById: async (id) => {
    return await Category.findByPk(id);
  },

  update: async (id, data) => {
    return await Category.update(data, { where: { id } });
  },

  delete: async (id) => {
    return await Category.destroy({ where: { id } });
  },
};
