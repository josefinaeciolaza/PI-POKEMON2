 const { Router } = require('express');
 const { getAllPokemons } = require('../Controllers/PokeController');
 const Sequelize = require('sequelize');
 const { Pokemon, Type } = require('../db');
 const axios = require('axios');
 const { searchNameApi, getPokemonByNameFromDB} = require('../Controllers/getNameControlle')
 const { idPokeDB, searchIdApi} = require('../Controllers/IdController')
  
 
 const router = Router();

router.get('/',  async (req, res) => {
    const name = req.query.name;
    try {
        if (!name) {
            const pokemons = await getAllPokemons();
            return pokemons.length ? res.status(200).json(pokemons)
                : res.status(400).json('Ups! We can\'t find any Pokemons...');
        } else {
            const searchName = await searchNameApi(name.toLowerCase());
            if (searchName && !searchName.error) {
                return res.status(200).send(searchName);
            }
            const dbName = await getPokemonByNameFromDB(name.toLowerCase());
            return dbName ? res.status(200).send(dbName)
                : res.status(400).json({ "message": "Pokemon not found" });
        }

    } catch (error) {
        res.status(404).send(error.message);
    }
});

//ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      if(id){
       let searchById = null;
       if(isNaN(id)){ //si no es un numero se busca en la base de dato
        searchById = await idPokeDB(id);
       }else{
        searchById = await searchIdApi(id);
        console.log(searchById)
       }
       if(searchById){
        return res.status(200).send(searchById);
       }else {
        return res.status(404).json({"message": "Pokemon Id not found"});
    }
      }
      return res.status(404).json({"message": "Pokemon Id not found"});
    } catch (error) {
      res.status(404).send(error.message);
    
    }
});

//POST
router.post('/', async (req, res) => {
    const {name, image, hp, attack, speed, defense, height, weight, types } = req.body;
    try {
        if(!name || !hp || !attack || !speed || !defense || !types){
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const newpoke = await Pokemon.create({
            name, image, hp, attack, speed, defense, height, weight
        })
        let addTipe = await Type.findAll({
            where: {name: types}
        })
        newpoke.addType(addTipe);
        res.status(201).json(newpoke)
    } catch (error) {
        res.status(500).send(error.message);
    }
});
 

module.exports = router;