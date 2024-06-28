// controllers/ApiController.js

const Airline = require('../models/Airlines');

class DropdownController {
  static async getAirlineNames(req, res) {
    try {
      const airlines = await Airline.findAll({ attributes: ['AirName'] });
      const airlineNames = airlines.map((airline) => airline.AirName);
      console.log(airlineNames)
      res.json(airlineNames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = DropdownController;

