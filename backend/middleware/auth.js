const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token)
    return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, "secretkey!@#", { algorithm: 'HS256' });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;