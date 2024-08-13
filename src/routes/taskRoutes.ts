import { Router } from 'express';
import { create, update, remove, list, getById } from '../controllers/taskController';

const router = Router();

router.post('/task', create);
router.put('/task/:id', update);
router.delete('/:id', remove);
router.get('/task', list);
router.get('/task/:id', getById);

export default router;
