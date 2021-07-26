import { Router } from 'express';
import KeyToken from './keyToken'
import UserController from '../controllers/UserController';

const router = Router();
router.post('/login', UserController.login);
//privadas
router.get('/listas/:page/:num/:prop/:orden',KeyToken,UserController.lista)
router.delete('/:id', KeyToken,UserController.delete);
router.post('/search',KeyToken,UserController.search);
router.post('/', KeyToken,UserController.registro);
router.get('/:id', KeyToken,UserController.item);
router.put('/:id', KeyToken,UserController.update);
router.get('/testing/:id', KeyToken,UserController.testing);
router.get('/items/lista',KeyToken,UserController.listas)
export default router;
