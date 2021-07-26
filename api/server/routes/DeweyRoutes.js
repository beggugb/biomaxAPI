import { Router } from 'express';
import KeyToken from './keyToken'
import DeweyController from '../controllers/DeweyController';

const router = Router();

router.get('/listas/:page/:num', DeweyController.data);
router.get('/lista/:name', DeweyController.listar);
router.post('/', DeweyController.registrar);
router.put('/:id', DeweyController.actualizar);
router.delete('/:id', DeweyController.borrar);

export default router;

