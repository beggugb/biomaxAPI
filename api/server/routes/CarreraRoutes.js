import { Router } from 'express';
import CarreraController from '../controllers/CarreraController';

const router = Router();
router.get('/lista',CarreraController.listas)
router.get('/listas/:page/:num/:prop/:orden',CarreraController.getAll)
router.post('/', CarreraController.add);

router.get('/:id', CarreraController.item);
router.put('/:id', CarreraController.actualizar);
router.delete('/:id', CarreraController.borrar);

export default router;

