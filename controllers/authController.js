
const User = require('../models/registraionModel');

const { generateToken,verifyToken } = require('../jwt/auth');

const AuthController = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.getUserByEmail(email,password);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate JWT token
      const token = generateToken({ userId: user.id, email: user.email,name: user.name });
      res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  async authorize(req, res, next) {
    const auth = req.headers.authorization;

    const token = auth && auth.split(' ')[1];
  console.log("token",token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const decodedToken = verifyToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ error: error.message });
    }
  }
};

module.exports = AuthController;