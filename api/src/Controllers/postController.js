// const { Pokemon, Type } = require('../db');

// const newPokemon = async (req, res) => {
//     const {name, image, hp, attack, speed, defense, height, weight, type } = req.body;
//     try {
//         if(!name || !hp || !attack || !speed || !defense || !type){
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }
//         const newpoke = await Pokemon.create({
//             name, image, hp, attack, speed, defense, height, weight
//         })
//         let addTipe = await Type.findAll({
//             where: {name: type}
//         })
//         newpoke.addType(addTipe);
//         res.status(201).json(newpoke)
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// module.exports = newPokemon;