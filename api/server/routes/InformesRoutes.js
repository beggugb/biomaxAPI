import { Router } from 'express';
import InformesController from '../controllers/InformesController';

const router = Router();
router.post('/libros',InformesController.libros)
router.post('/consolidado',InformesController.consolidado)
router.post('/movimientos',InformesController.movimientos)
export default router;

