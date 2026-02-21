const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.ADMIN_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    message: 'Admin login successful',
    token,
  });
};

module.exports = { adminLogin };
