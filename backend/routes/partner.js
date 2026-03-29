const express = require('express');
const { body, validationResult } = require('express-validator');
const Partner = require('../models/Partner');
const { sendPartnerRequestEmail } = require('../utils/emailService');

const router = express.Router();

// @route POST /api/partner/apply
router.post('/apply', [
  body('fullName').trim().notEmpty().withMessage('Full Name is required'),
  body('companyName').trim().notEmpty().withMessage('Company Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid Email is required'),
  body('phone').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit phone number is required'),
  body('businessType').isIn(['DSA', 'Agent', 'NBFC', 'Bank', 'Freelancer']).withMessage('Valid Business Type is required'),
  body('yearsOfExperience').isFloat({ min: 0, max: 60 }).withMessage('Experience must be between 0 and 60'),
  body('city').trim().notEmpty().withMessage('City / Location is required'),
  body('message').optional({ nullable: true }).isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const partner = await Partner.create(req.body);

    await sendPartnerRequestEmail(partner);

    return res.status(201).json({
      success: true,
      message: 'Partnership request submitted successfully. Our team will contact you soon.',
      data: { id: partner._id },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to submit partnership request' });
  }
});

module.exports = router;
