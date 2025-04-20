const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Demande = db.define(
  "Demande",
  {
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en_attente",
      validate: {
        isIn: [["en_attente", "acceptee", "refusee"]],
      },
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "demandes",
  }
);

module.exports = Demande;
