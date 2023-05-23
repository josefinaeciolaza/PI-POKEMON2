const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', { 
    // Sequelize creará automáticamente una columna de ID como clave primaria si no se especifica explícitamente una clave primaria
    name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, 
    { timestamps: false }
    );
};