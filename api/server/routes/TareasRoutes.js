import { Router } from 'express';
import TareaController from '../controllers/TareaController';

const router = Router();

/*Lista protegida*/
router.post('/lista', TareaController.lista);
router.post('/', TareaController.add);
router.put('/:id', TareaController.update);

export default router;