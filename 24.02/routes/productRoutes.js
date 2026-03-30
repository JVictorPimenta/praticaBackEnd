import express from 'express';
import productController from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', authMiddleware, roleMiddleware('admin'), productController.create);
productRouter.put('/:id', authMiddleware, roleMiddleware('admin'), productController.update);
productRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), productController.delete);

export default productRouter;
