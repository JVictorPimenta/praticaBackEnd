import express from 'express';
import categoryController from '../controllers/categoryController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.post('/', authMiddleware, roleMiddleware('admin'), categoryController.create);
categoryRouter.put('/:id', authMiddleware, roleMiddleware('admin'), categoryController.update);
categoryRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), categoryController.delete);

export default categoryRouter;
