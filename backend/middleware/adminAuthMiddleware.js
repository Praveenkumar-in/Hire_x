const jwt = require('jsonwebtoken');

const adminProtect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Admin token missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }

    req.admin = true;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid admin token' });
  }
};

module.exports = { adminProtect };
