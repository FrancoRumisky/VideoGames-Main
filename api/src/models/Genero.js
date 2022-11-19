const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genero", {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });
};
