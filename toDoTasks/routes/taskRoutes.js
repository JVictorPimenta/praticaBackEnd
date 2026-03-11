import express from 'express';
import taskController from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.get('/', taskController.getAll)
taskRouter.get('/:id', taskController.getById)
taskRouter.post('/', taskController.create)
taskRouter.put('/:id', taskController.update)
taskRouter.delete('/:id', taskController.delete)

export default taskRouter;