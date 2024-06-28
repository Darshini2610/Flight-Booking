// controllers/LoginController.js

const User = require('../models/User');

class LoginController {
  // Handle user login
  static login(contact) {
    // Fetch user from the database (or an array, a file, etc.)
    try {
      const user = User.findOne({ where: { contact } });
      return user;
    } catch (error) {
      throw error;
    }

    
  }
}

module.exports = LoginController;
