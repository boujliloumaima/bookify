const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Service = db.define(
  "Service",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jours_disponibilite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heure_debut: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    heure_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "services",
  }
);

module.exports = Service;
