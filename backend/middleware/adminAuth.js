const protect = require('./auth');

const adminAuth = async (req, res, next) => {
  await protect(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
    }
  });
};

module.exports = adminAuth;
