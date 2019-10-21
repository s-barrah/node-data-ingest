import { Router } from 'express';

import ContractController from '../controllers/Contract.controller';

const router = Router();

const contractController = new ContractController();

router.get('/test', contractController.test);

router.post('/create', contractController.create);

router.post('/update', contractController.update);

router.post('/delete', contractController.delete);

export default router;
