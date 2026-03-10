import Category from "../models/Category.js"
import Product from "../models/Product.js";

const categoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: {
          model: Product,
          as: "products",
        },
      });

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id, {
        include: {
          model: Product,
          as: "products",
        },
      });

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getCategoryProducts: async (req, res) => {
    try {
      const {id} = req.params;
      const category = await Category.findByPk(id, { include:'products' });
      if (!category) {
        return res.status(404).json({
          success: false,
          data: null,
          message: 'categoria não enontrada'
        });
      }
      res.status(200).json({
        succes: true,
        data: category.products,
        message: 'produtos da categoria recuperados com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        sucess: false,
        data: null,
        message: 'falha ao recuperar produtos da categoria'
      });
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      const { name, description } = req.body;

      const category = await Category.create({
        name,
        description,
      });

      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      let nomeAtt = name || category.name
      await category.update({ nomeAtt, description });

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await category.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const { category, minPrice, maxPrice, order } = req.query;
      const where = {};
      const Op = require("sequelize").Op;

      if (category) where.category = category;

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price[Op.gte] = Number(minPrice);
        if (maxPrice) where.price[Op.lte] = Number(maxPrice);
      }

      const products = await Product.findAll({
        where,
        order: [["price", order === "desc" ? "DESC" : "ASC"]]
      });

      res.json({ sucess:true, data: products });
    } catch (err) {
      res.status(500).json({ sucess: false, error: error.message });
    }
  }

};
export default categoryController;
