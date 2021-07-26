import { Router } from 'express';
import ConsultasController from '../controllers/ConsultasController';
const router = Router();

/*Protected*/
router.get('/buscar/:page/:num/:consulta', ConsultasController.search);
export default router;


