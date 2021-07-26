import { Router } from 'express';
import KeyToken from './keyToken'
import LibroController from '../controllers/LibroController';

const router = Router();

router.get('/listas/:page/:num/:prop/:orden', LibroController.data);
router.get('/lista/:name', LibroController.listar);
router.get('/:id', LibroController.item);
/*router.post('/', LibroController.registrar);*/
router.post('/registro', LibroController.registro);
router.put('/:id', LibroController.actualizar);
router.delete('/:id', LibroController.borrar);
router.post('/search', LibroController.buscar);
router.post('/searcha', LibroController.consulta);
router.post('/searchu', LibroController.buscaru);
export default router;


