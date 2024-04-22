const jwt = require('jsonwebtoken');
const secret = "your_secret_key"

function generateToken(payload) {
  return jwt.sign(payload,  secret);
}

function verifyToken(token) {
    try {
     return jwt.verify(token, secret);
    } catch (error) {
      console.error('Error verifying token:', error.message);
      throw new Error('Invalid token');
    }
  }

module.exports = { generateToken, verifyToken }
