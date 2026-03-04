import Product from "../models/Product.js";
import Category from "../models/Category.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: {
          model: Category,
          as: "category",
        },
      });

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: {
          model: Category,
          as: "category",
        },
      });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name, price, categoryId } = req.body;

      // Verifica se a categoria existe
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(400).json({ message: "Categoria inválida" });
      }

      const product = await Product.create({
        name,
        price,
        categoryId,
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, categoryId } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      // Se estiver alterando categoria, valida
      if (categoryId) {
        const category = await Category.findByPk(categoryId);

        if (!category) {
          return res.status(400).json({ message: "Categoria inválida" });
        }
      }

      await product.update({ name, price, categoryId });

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await product.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
export default productController;
