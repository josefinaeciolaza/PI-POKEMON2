const axios = require('axios');
const { Type } = require('../db');

const URL = "https://pokeapi.co/api/v2/type";

const getTypes = async (req, res) => {
    const typesApi = await axios.get(URL);
    const types = typesApi.data.results;
    types.forEach((type) => {
        Type.findOrCreate({
            where: { name: type.name },
          });
    });
    const allTypes = await Type.findAll({    
        attributes: {
        exclude: ['updatedAt', 'createdAt']
    }});

    res.status(200).send(allTypes);

};
module.exports = getTypes;