//const { Router } = require('express')
//const { getAllPokemons } = require('./PokeController');
const Sequelize = require('sequelize');
const { Pokemon, Type } = require('../db');
const axios = require('axios');


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
  


module.exports = {searchNameApi, getPokemonByNameFromDB};