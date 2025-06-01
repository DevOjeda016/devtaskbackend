import { Router } from 'express';
import userController from './usersController';

const router: Router = Router();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.get('/:id', userController.findById);
router.delete('/:id', userController.remove);

export default router;
