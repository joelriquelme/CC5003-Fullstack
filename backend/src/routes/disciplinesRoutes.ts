import { Router } from 'express';
import * as DisciplinasController from '../controllers/disciplinesController';

const router = Router();

router.get('/', DisciplinasController.getAll);
router.get('/:id', DisciplinasController.getOne);
router.post('/', DisciplinasController.create);
router.put('/:id', DisciplinasController.update);
router.delete('/:id', DisciplinasController.remove);

export default router;