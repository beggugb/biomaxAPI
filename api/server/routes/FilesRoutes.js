import { Router } from 'express';
import FilesController from '../controllers/FilesController';

const router = Router();
router.put('/libro/item/:id', FilesController.libros);
export default router;
