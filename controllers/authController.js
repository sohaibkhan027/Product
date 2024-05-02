const { verifyToken } = require('../jwt/auth');

const AuthController = {
  async authorize(req, res, next) {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];
    console.log("auth",auth);
    console.log("token",token);

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decodedToken = verifyToken(token);
      req.user = decodedToken;

      console.log("decode",decodedToken);

      // if (decodedToken.role !== 'admin') {
      //   return res.status(403).json({ error: 'Forbidden' });
      // }

      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ error: error.message });
    }
  }
};

module.exports = AuthController;
