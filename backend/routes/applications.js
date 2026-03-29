const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const protect = require('../middleware/auth');

// @route GET /api/applications
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { userId: req.user._id };
    if (status) query.status = status;
    const applications = await Application.find(query)
      .populate('loanId', 'name bankName type interestRate')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Application.countDocuments(query);
    res.json({ success: true, data: applications, total, pages: Math.ceil(total / limit), currentPage: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/applications/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, userId: req.user._id })
      .populate('loanId', 'name bankName type interestRate loanAmount');
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
