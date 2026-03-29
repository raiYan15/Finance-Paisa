const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Application = require('../models/Application');
const Loan = require('../models/Loan');
const adminAuth = require('../middleware/adminAuth');
const { sendApplicationStatusEmail } = require('../utils/emailService');

// @route GET /api/admin/dashboard
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalApplications, totalLoans, pendingApps, approvedApps, rejectedApps] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Application.countDocuments(),
      Loan.countDocuments({ isActive: true }),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'approved' }),
      Application.countDocuments({ status: 'rejected' }),
    ]);

    // Monthly applications data for chart
    const monthlyData = await Application.aggregate([
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          count: { $sum: 1 },
          totalAmount: { $sum: '$loanRequirements.loanAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ]);

    // Loan type distribution
    const loanTypeData = await Application.aggregate([
      { $group: { _id: '$loanRequirements.loanType', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        stats: { totalUsers, totalApplications, totalLoans, pendingApps, approvedApps, rejectedApps },
        monthlyData,
        loanTypeData
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/admin/users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = { role: 'user' };
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
    const users = await User.find(query)
      .select('-password -otp -otpExpiry')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await User.countDocuments(query);
    res.json({ success: true, data: users, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/admin/applications
router.get('/applications', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    
    let applications = await Application.find(query)
      .populate('userId', 'name email phone')
      .populate('loanId', 'name bankName type')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    if (search) {
      applications = applications.filter(app =>
        app.personalDetails?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        app.applicationNumber?.includes(search) ||
        app.userId?.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    const total = await Application.countDocuments(query);
    res.json({ success: true, data: applications, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route PATCH /api/admin/applications/:id
router.patch('/applications/:id', adminAuth, async (req, res) => {
  try {
    const { status, adminNotes, rejectionReason, approvedAmount, approvedInterestRate } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });

    application.status = status;
    if (adminNotes) application.adminNotes = adminNotes;
    if (rejectionReason) application.rejectionReason = rejectionReason;
    if (approvedAmount) application.approvedAmount = approvedAmount;
    if (approvedInterestRate) application.approvedInterestRate = approvedInterestRate;
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();
    await application.save();

    // Send email notification
    const user = await User.findById(application.userId);
    if (user) await sendApplicationStatusEmail(user, application);

    res.json({ success: true, message: `Application ${status} successfully`, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/admin/loans
router.post('/loans', adminAuth, async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json({ success: true, message: 'Loan product created', data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route PATCH /api/admin/loans/:id
router.patch('/loans/:id', adminAuth, async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' });
    res.json({ success: true, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
