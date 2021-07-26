import { Router } from 'express';
import KeyToken from './keyToken'
import MovimientosController from '../controllers/MovimientosController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',MovimientosController.getAllDevoluciones)
export default router;
