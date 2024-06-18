import express from 'express';
import { 
          getAllMusics, 
          getGenreMusics, 
          getIDMusics,
          createMusic,
          updateMusic, 
          deleteMusic
        } from '../controllers/musicsControllers.js';

const router = express.Router();

router.post('/create/:user_id', createMusic);

router.get('/', getAllMusics);
router.get('/genre/:genre', getGenreMusics);
router.get('/user/:user_id', getIDMusics);

router.put('/update/:id', updateMusic);

router.delete('/delete/:id', deleteMusic);

export default router;