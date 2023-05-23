//const { Router } = require('express')
const { getAllPokemons } = require('./PokeController');
const Sequelize = require('sequelize');
const { Pokemon, Type } = require('../db');
const axios = require('axios');

// const router = Router();

// router.get("/", async (req, res) => {
//     const name = req.query.name;
//     try {
//        const pokemons = await getAllPokemons();
//        if(name){
//         const namePoke = pokemons.filter(
//             pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase())//toLowerCase verifica las mayusculas minusculas, y includes lo que hace es que verifica si lo que pasamos por query esta en el string de name
//         )
//         namePoke.length ? res.status(200).send(namePoke) //si lo encuentro
//         : res.status(400).send("No pokemon with that name found") //si no lo encuentro
//     }else{
//         res.status(200).json(pokemons); // s no esta buscando por name me muestra todos los pokemons
//     }; 
//     } catch (error) {
//         res.status(404).json("Bad request")
//     }
// });

const searchNameApi = async (name) => {
try{
    const namePo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if(namePo.data){
        let pok = namePo;
        return{
            id: pok.data.id,
            name: pok.data.name,
            image: pok.data.sprites.front_default,  // url imagen
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
  

const getPokemon = async (req, res) => {
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
};


module.exports = getPokemon;