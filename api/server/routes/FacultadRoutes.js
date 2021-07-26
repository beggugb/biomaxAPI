import { Router } from 'express';
import FacultadController from '../controllers/FacultadController';

const router = Router();

/*Protected*/
router.get('/lista/:page/:num', FacultadController.data);
router.get('/listar/:name', FacultadController.listar);
router.post('/', FacultadController.registrar);
router.put('/:id', FacultadController.actualizar);
router.delete('/:id', FacultadController.borrar);
export default router;


