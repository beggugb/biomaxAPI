import { Router } from 'express';
import KeyToken from './keyToken'
import MovimientosController from '../controllers/MovimientosController';

const router = Router();
router.get('/lista',MovimientosController.listas)
router.get('/listas/:page/:num/:prop/:orden',MovimientosController.getAll)
router.post('/', MovimientosController.add);

router.get('/:id', MovimientosController.item);
router.put('/:id', MovimientosController.actualizar);
router.delete('/:id', MovimientosController.borrar);
router.get('/listadetalle/:page/:num/:id',MovimientosController.listadetalle)
export default router;
