import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Admin token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
    if (err) return res.status(403).json({ message: 'Invalid admin token' });
    req.admin = admin; // attach admin info
    next();
  });
};

export default authenticateAdmin;
