const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define(
  "Event",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    allDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    backgroundColor: {
      type: DataTypes.STRING,
      defaultValue: "#3788d8",
    },
    borderColor: {
      type: DataTypes.STRING,
      defaultValue: "#3788d8",
    },
  },
  {
    tableName: "event", // nom de ta table
    timestamps: true, // createdAt, updatedAt automatiques
  }
);

module.exports = Event;
