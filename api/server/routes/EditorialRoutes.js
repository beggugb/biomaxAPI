import { Router } from 'express';
import KeyToken from './keyToken'
import EditorialController from '../controllers/EditorialController';

const router = Router();
router.get('/lista',EditorialController.listas)
router.get('/listas/:page/:num/:prop/:orden',EditorialController.getAll)
router.post('/', EditorialController.add);

router.get('/:id', EditorialController.item);
router.put('/:id', EditorialController.actualizar);
router.delete('/:id', EditorialController.borrar);
export default router;


