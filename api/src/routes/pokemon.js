 const { Router } = require('express');
 const { getAllPokemons } = require('../Controllers/PokeController');
 const Sequelize = require('sequelize');
 const { Pokemon, Type } = require('../db');
 const axios = require('axios');
 
  const router = Router();
 
 const searchNameApi = async (name) => {
 try{
     const namePo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
     if(namePo.data){
         let pok = namePo;
         return{
             id: pok.data.id,
             name: pok.data.name,
             image: pok.data.sprites.other["official-artwork"]["front_default"],  // url imagen
             hp: pok.data.stats[0].base_stat,
             attack: pok.data.stats[1].base_stat,
             defense: pok.data.stats[2].base_stat,
             speed: pok.data.stats[3].base_stat,
             height: pok.data.height,
             weight: pok.data.weight,
             types: pok.data.types.map((t) => { return {name: t.type.name}})
         }
     }else{
         return null;
     }
 } catch (error) {
     return ({error : "Not found"});
 }
 };
 
 async function getPokemonByNameFromDB(name) {
     try {
       const pokemon = await Pokemon.findOne({
         where: Sequelize.where(        //con esto buscamos el nombre sin importar las mayusculas y minusculas.
           Sequelize.fn('lower', Sequelize.col('name')),
           Sequelize.fn('lower', name)
         ),
         include: {
           model: Type,
           attributes: ['name'],
           through: { attributes: [] },
         },
       });
       return pokemon;
     } catch (error) {
       console.error(error);
       return null;
     }
   };
   
 
//  const getPokemon = async (req, res) => {
//      const name = req.query.name;
//      try {
//          if (!name) {
//              const pokemons = await getAllPokemons();
//              return pokemons.length ? res.status(200).json(pokemons)
//                  : res.status(400).json('Ups! We can\'t find any Pokemons...');
//          } else {
//              const searchName = await searchNameApi(name.toLowerCase());
//              if (searchName && !searchName.error) {
//                  return res.status(200).send(searchName);
//              }
//              const dbName = await getPokemonByNameFromDB(name.toLowerCase());
//              return dbName ? res.status(200).send(dbName)
//                  : res.status(400).json({ "message": "Pokemon not found" });
//          }
 
//      } catch (error) {
//          res.status(404).send(error.message);
//      }
//  };

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
const searchIdApi = async (id) => {
    try {
        const searchAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if(searchAPI.data){
            let pok = searchAPI;
            return{
                id: pok.data.id,
                name: pok.data.name,
                image: pok.data.sprites.other["official-artwork"]["front_default"],  // url imagen
                hp: pok.data.stats[0].base_stat,
                attack: pok.data.stats[1].base_stat,
                defense: pok.data.stats[2].base_stat,
                speed: pok.data.stats[3].base_stat,
                height: pok.data.height,
                weight: pok.data.weight,
                types: pok.data.types.map((t) => { return {name: t.type.name}})
            }
        }else{
            return null;
        }
    } catch (error) {
        return ({error : "Not found"});
    }
}

const idPokeDB = async (id) => {
    return await Pokemon.findOne({
      where: { id: id },
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
  };

// const getIdPokemon = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if(id){
//        let searchById = null;
//        if(isNaN(id)){ //si no es un numero se busca en la base de dato
//         searchById = await idPokeDB(id);
//        }else{
//         searchById = await searchIdApi(id);
//         console.log(searchById)
//        }
//        if(searchById){
//         return res.status(200).send(searchById);
//        }else {
//         return res.status(404).json({"message": "Pokemon Id not found"});
//     }
//       }
//       return res.status(404).json({"message": "Pokemon Id not found"});
//     } catch (error) {
//       res.status(404).send(error.message);
    
//     }
// };

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