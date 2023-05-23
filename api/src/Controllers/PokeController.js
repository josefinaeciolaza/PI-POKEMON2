const axios = require('axios');
const { Pokemon, Type } = require('../db');

//PEDIDO DE POKEMONS A LA API 
 const pokeApi = async () => {
    try{
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100"); //PETICION A LA API, CON UN LIMITE DE 100 POKEMONS;
    const allResponse = response.data.results; //ACCEDO AL OBJETO DATA Y A SU CAMPO RESULTS, LOS GUARDO EN UNA VARIABLE
    const pokemonData = await Promise.all( //PETICION A CADA POKEMON DE FORMA ASINCRONICA, NO  SABEMOS EN QUE ORDEN RECIBIREMOS LAS RESPUESTAS Y PARA RECIBIRLAS EN ORDEN HACEMOS UN Promis.all: Esta función recibe una matriz de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas en la matriz se han resuelto.
        allResponse.map(async (pokemon) => {
          const res = await axios.get(pokemon.url); //HACEMOS UN GET A CADA UNO DE LOS ENDPOINTS DE LA API, QUE CONTIENEN LA INFO DE C/POKEMON.
          return res.data;
        })
      );
      const pokemonArray = pokemonData.map((data) => ({
        id: data.id,
        name: data.name,
        types: data.types.map((type) => type.type.name),
        image: data.sprites.other["official-artwork"]["front_default"],
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[3].base_stat,
        height: data.height,
        weight: data.weight,
      }));
      return pokemonArray;
    } catch (error) {
      console.error(error);
    }
  };

  //TRAEMOS LOS POKEMONS DE LA BASE DE DATOS POR NAME
  const pokeDB = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through:{
                attributes: [],
            }
        }  
    }) 
  };

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
  

  //UNION DE LA API Y BASE DE DATOS PARA TRAER TODOS LOS POKEMONS Y BUSCAR POR NAME
  const getAllPokemons = async () => {
    const apiInfo = await pokeApi();
    const dbInfo = await pokeDB();

    const unionInfo = [...apiInfo,...dbInfo]
    return unionInfo;
  }

  module.exports = {getAllPokemons, pokeApi, idPokeDB};


