const { Router } = require('express');
const { getAllVideogames, getVideogamesByName } = require('../controllers/Videogames');
const router = Router();

router.get('/', getVideogamesByName, getAllVideogames)

module.exports = router;