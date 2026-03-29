const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Application = require('../models/Application');
const protect = require('../middleware/auth');
const { calculateEligibilityScore, getRecommendedRate, getMaxEligibleAmount, recommendLoans } = require('../utils/eligibilityEngine');

// @route GET /api/loans
router.get('/', async (req, res) => {
  try {
    const { type, search, minAmount, maxAmount, sort } = req.query;
    let query = { isActive: true };
    if (type && type !== 'all') query.type = type;
    if (minAmount) query['loanAmount.min'] = { $lte: parseInt(minAmount) };
    if (maxAmount) query['loanAmount.max'] = { $gte: parseInt(maxAmount) };
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { bankName: { $regex: search, $options: 'i' } }
    ];
    let sortObj = {};
    if (sort === 'rate_asc') sortObj = { 'interestRate.min': 1 };
    else if (sort === 'rate_desc') sortObj = { 'interestRate.min': -1 };
    else if (sort === 'amount_desc') sortObj = { 'loanAmount.max': -1 };
    else sortObj = { rating: -1 };

    const loans = await Loan.find(query).sort(sortObj);
    res.json({ success: true, count: loans.length, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/loans/:id
router.get('/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' });
    res.json({ success: true, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/loans/check-eligibility
router.post('/check-eligibility', protect, async (req, res) => {
  try {
    const { monthlyIncome, existingEMI, loanAmount, employmentType, creditScore, workExperience, loanType } = req.body;
    const score = calculateEligibilityScore({ monthlyIncome, existingEMI, loanAmount, employmentType, creditScore, workExperience });
    const recommendedRate = getRecommendedRate(score, loanType);
    const maxAmount = getMaxEligibleAmount(monthlyIncome, existingEMI, score);
    const loans = await Loan.find({ isActive: true });
    const recommended = recommendLoans(loans, score, loanType, loanAmount);
    res.json({ success: true, eligibilityScore: score, recommendedInterestRate: recommendedRate, maxEligibleAmount: maxAmount, recommendedLoans: recommended });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/loans/apply
router.post('/apply', protect, async (req, res) => {
  try {
    const { personalDetails, employmentDetails, incomeDetails, loanRequirements, loanId } = req.body;
    const score = calculateEligibilityScore({
      monthlyIncome: incomeDetails.monthlyIncome,
      existingEMI: incomeDetails.existingEMI,
      loanAmount: loanRequirements.loanAmount,
      employmentType: employmentDetails.employmentType,
      creditScore: undefined,
      workExperience: employmentDetails.workExperience
    });
    const recommendedRate = getRecommendedRate(score, loanRequirements.loanType);
    const maxAmount = getMaxEligibleAmount(incomeDetails.monthlyIncome, incomeDetails.existingEMI, score);

    const application = await Application.create({
      userId: req.user._id,
      loanId: loanId || undefined,
      personalDetails,
      employmentDetails,
      incomeDetails,
      loanRequirements,
      eligibilityScore: score,
      recommendedInterestRate: recommendedRate,
      maxEligibleAmount: maxAmount
    });
    res.status(201).json({ success: true, message: 'Application submitted successfully!', data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
