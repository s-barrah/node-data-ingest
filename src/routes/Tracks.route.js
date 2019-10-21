import { Router } from 'express';


import TrackController from '../controllers/Track.controller';

const router = Router();

const trackController = new TrackController();

router.get('/import', trackController.import);

router.post('/search', trackController.search);

router.post('/create', trackController.create);

router.post('/update', trackController.update);

router.post('/delete', trackController.delete);

export default router;
