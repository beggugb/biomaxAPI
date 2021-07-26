import { Router } from 'express';
import KeyToken from './keyToken'
import CutterController from '../controllers/CutterController';

const router = Router();

router.get('/listas/:page/:num', CutterController.data);
router.get('/lista/:name', CutterController.listar);
router.post('/', CutterController.registrar);
router.put('/:id', CutterController.actualizar);
router.delete('/:id', CutterController.borrar);

export default router;


