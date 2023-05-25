//const { idPokeDB } = require('./PokeController');
const axios = require('axios');
const { Pokemon, Type } = require('../db');


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
  
  module.exports = {idPokeDB, searchIdApi};