const { Router } = require('express');
const { getAllGenres } = require('../controllers/Genres');
const router = Router();

router.get('/', getAllGenres);


module.exports = router;