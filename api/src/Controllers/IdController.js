//const { idPokeDB } = require('./PokeController');
const axios = require('axios');
const { Pokemon, Type } = require('../db');


// const getIdPokemon = async (req, res) => {
//     const { id } = req.params;
//     const idNumber = Number(id);
  
//     const pokeFromDB = await idPokeDB(idNumber);
//     if (pokeFromDB) {
//       res.status(200).send(pokeFromDB);
//     } else {
//       const apiResponse = await pokeApi();
//       const pokemonFromApi = apiResponse.filter(pokemon => pokemon.id === idNumber)[0];
//       res.status(200).send(pokemonFromApi);
//     }
//   };

// const getIdPokemon = async (req, res) => {
//     const { id } = req.params;
//     // const pokemons = await getAllPokemons();
//     // const findId = pokemons.filter(pokemon => pokemon.id == id);
//     try {
//         const pokemons = await getAllPokemons();
//         const findId = pokemons.filter(pokemon => pokemon.id == id);
//        if(findId){
//         res.status(200).send(findId)
//        }else{
//         res.status(400).send("No Pokemons found")
//        }
//     } catch (error) {
//         res.status(404).json("Bad request")  
//     }
// };

const searchIdApi = async (id) => {
    try {
        const searchAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if(searchAPI.data){
            let pok = searchAPI;
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

const getIdPokemon = async (req, res) => {
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
};
  
  module.exports = getIdPokemon;