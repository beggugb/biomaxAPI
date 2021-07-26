import { Router } from 'express';
import BibliotecaController from '../controllers/BibliotecaController';
const router = Router();

/*Protected*/
router.put('/:id', BibliotecaController.actualizar);
router.get('/:id', BibliotecaController.item);
export default router;

