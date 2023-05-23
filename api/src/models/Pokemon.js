const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID, //Identificador Unico Universal, EJ:550e8400-e29b-11d4-a716-446655440000
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, //si no se proporciona un valor para la columna al insertar una nueva fila, Sequelize debe generar automáticamente un nuevo UUID utilizando la función UUIDV4.
    },
    image: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true //no son obligatorios!
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  { timestamps: false }
  );
};
