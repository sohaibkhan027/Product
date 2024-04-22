
const User = require('../models/registraionModel');


const UserController = {
  async createUser(req, res) {
    const {name, email, phone, password } = req.body;
    try {
      const newUser = await User.createUser(name,email, phone, password);
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = UserController;
