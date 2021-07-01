const { Router } = require('express');
const { getVideogameById, addVideogame } = require('../controllers/Videogame');
const router = Router();

router.get('/:id', getVideogameById);
router.post('/', addVideogame);

module.exports = router;