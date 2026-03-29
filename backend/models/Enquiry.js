const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [120, 'Full name cannot exceed 120 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['Loan Enquiry', 'Support', 'Partnership', 'Other'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved'],
    default: 'new',
  },
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
