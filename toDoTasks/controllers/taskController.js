import Task from "../models/Task.js";

const taskController = {
  getAll: async (req, res) => {
    try {
      const tasks = await Task.findAll();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: "task not found" });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      const task = await Task.create({ title, description, completed });

      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: "task not found" });
      }

      await task.update({ title, description, completed });

      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: "task not found" });
      }

      await task.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default taskController;
