import express from 'express';
import * as controller from '../controller/controller.js';

const router = express.Router();

router.get('/movies/:title', controller.getMovie);
router.post('/shows/:title', controller.getShow);  
router.get('/favourites', controller.getFavourites);
router.post('/favourites', controller.addFavourites);
router.patch('/favourites/:id', controller.updateFavourites);
router.delete('/favourites/:id', controller.deleteFavourites);

export default router;