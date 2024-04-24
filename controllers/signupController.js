const User = require('../models/registraionModel');

const UserController = {
  async createUser(req, res) {
    const {name, email, phone, password } = req.body;
    try {
      const existingUser = await User.getUserByEmail(email, password);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const userId = await User.createUser(name, email, phone, password);
  
      res.status(201).json({ message: 'User created successfully', userId });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async getAllUser(req,res){
    try{
    const allUsers = await User.getAllUser()
    console.log("Users",allUsers);
    res.json(allUsers)

    }
    catch(error){
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'error fetch error' })
    }

  }
};

module.exports = UserController;
