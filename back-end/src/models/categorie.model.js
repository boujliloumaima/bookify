const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Categorie = db.define(
  "Categorie",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "categories",
  }
);

module.exports = Categorie;
