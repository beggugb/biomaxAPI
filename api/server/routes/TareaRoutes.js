import { Router } from 'express';
import KeyToken from './keyToken'
import TareaController from '../controllers/TareaController';

const router = Router();

router.post('/listar', TareaController.listar);
router.post('/', TareaController.addTarea);
router.put('/:id', TareaController.updateTarea);

export default router;


