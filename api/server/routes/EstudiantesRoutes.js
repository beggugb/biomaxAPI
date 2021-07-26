import { Router } from 'express';
import EstudianteController from '../controllers/EstudianteController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',EstudianteController.lista)
router.get('/:id',EstudianteController.item)
router.post('/registro', EstudianteController.registro);
router.post('/', EstudianteController.add);
router.put('/:id', EstudianteController.update);
router.delete('/:id', EstudianteController.delete);
router.post('/search',EstudianteController.search);
export default router;

