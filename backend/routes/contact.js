const express = require('express');
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const { sendEnquiryEmail } = require('../utils/emailService');

const router = express.Router();

// @route POST /api/contact
router.post('/', [
  body('fullName').trim().notEmpty().withMessage('Full Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid Email is required'),
  body('phone').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit phone number is required'),
  body('subject').isIn(['Loan Enquiry', 'Support', 'Partnership', 'Other']).withMessage('Valid Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const enquiry = await Enquiry.create(req.body);

    await sendEnquiryEmail(enquiry);

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. We will get back to you shortly.',
      data: { id: enquiry._id },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to submit enquiry' });
  }
});

module.exports = router;
