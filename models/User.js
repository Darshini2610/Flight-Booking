const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  phoneNumber: {
    type: DataTypes.STRING, // You can specify a more specific format for phone numbers if needed
    allowNull: false,
    unique: true, // Ensure phone numbers are unique
  },
});

module.exports = User;


  