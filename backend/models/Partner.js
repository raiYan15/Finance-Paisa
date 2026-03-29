const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [120, 'Full name cannot exceed 120 characters'],
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [180, 'Company name cannot exceed 180 characters'],
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
  businessType: {
    type: String,
    required: [true, 'Business type is required'],
    enum: ['DSA', 'Agent', 'NBFC', 'Bank', 'Freelancer'],
  },
  yearsOfExperience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: [0, 'Experience cannot be negative'],
    max: [60, 'Experience cannot exceed 60 years'],
  },
  city: {
    type: String,
    required: [true, 'City / Location is required'],
    trim: true,
    maxlength: [80, 'City / Location cannot exceed 80 characters'],
  },
  message: {
    type: String,
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'closed'],
    default: 'new',
  },
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);
