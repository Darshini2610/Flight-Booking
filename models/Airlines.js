// models/Airline.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('flightbooking', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Airline = sequelize.define('Airline', {
  AirID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  AirName: {
    type: DataTypes.STRING,
  },
});

sequelize.sync(); // Sync the model with the database (create the table if it doesn't exist)

module.exports = Airline;

