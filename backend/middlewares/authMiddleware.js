import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware function for authentication
const protect = async (req, res, next) => {
  // Get token from the 'Authorization' header
  const authHeader = req.header('Authorization');

  // Extract token from 'Bearer' scheme
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log decoded token for debugging

    // Attach user to request object
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Log the error for debugging
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default protect;
