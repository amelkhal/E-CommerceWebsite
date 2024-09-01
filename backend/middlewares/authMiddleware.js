import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware function for authentication
const protect = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    // Attach user to request object
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default protect;
