import express from 'express';
import userController from './usersController.js';

const router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
