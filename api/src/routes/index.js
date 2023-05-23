const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const getPokemon = require('../Controllers/getNameControlle');
// const getIdPokemon = require('../Controllers/IdController');
const getTypes = require('../Controllers/typeController');
//const newPokemon = require('../Controllers/postController');
//const pokemonRouter = require('./pre');
const pokemonsRoutes = require('./pokemon.js');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use(express.json());
// router.get("/pokemons", getPokemon);
// router.get("/pokemons/:id", getIdPokemon);
// router.post("/pokemons", newPokemon);
router.use("/pokemons", pokemonsRoutes);
router.get("/types", getTypes);



module.exports = router;
