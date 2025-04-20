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
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "services",
  }
);

module.exports = Service;
