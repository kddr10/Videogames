const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRoutes = require('./videogames')
const GenresRoutes = require('./genres')
const VideogameRoutes = require('./videogame')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', VideogamesRoutes)
router.use('/videogame', VideogameRoutes)
router.use('/genres', GenresRoutes)


module.exports = router;
