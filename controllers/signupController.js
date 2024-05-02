const User = require('../models/registraionModel');
const { generateToken } = require('../jwt/auth');

const UserController = {
  async createUser(req, res) {
    const {name, email, phone, password ,role} = req.body;
    try {
      const userId = await User.createUser(name, email, phone, password,role);
      res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
      if (error.message === 'Email is already registered') {
          return res.status(400).json({ error: 'Email is already registered' });
      } else if (error.message === 'Phone number is already registered') {
          return res.status(400).json({ error: 'Phone number is already registered' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
  }
  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.getUserByEmail(email, password);
        console.log("user", user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate JWT token only for admin and superadmin
        const role = user.role;
        let token = null; // Initialize token variable

        if (role === 'admin' || role === 'superadmin') {
            token = generateToken({ userId: user.id, email: user.email, name: user.name , role })
        }

        if (token) { // Check if token is generated
            res.status(200).json({ user, message: 'Login successful', token  });
        } else {
            res.status(200).json({ user, message: 'Login successful' });
        }

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
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

  },
  // async  createSuperAdmin() {
  //   try {
  //     const superAdminId = await User.createSuperAdmin('superadmin_username', 'superadmin_password');
  //     console.log('Superadmin created with ID:', superAdminId);
  //   } catch (error) {
  //     console.error('Error creating superadmin:', error);
  //   }
  // }
};

module.exports = UserController;
