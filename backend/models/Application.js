const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan'
  },
  applicationNumber: {
    type: String,
    unique: true
  },
  // Personal Details
  personalDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    maritalStatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
    panCard: String,
    aadharCard: String,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  // Employment Details
  employmentDetails: {
    employmentType: { type: String, enum: ['salaried', 'self-employed', 'business', 'retired', 'other'] },
    companyName: String,
    designation: String,
    workExperience: Number,  // years
    currentJobTenure: Number, // months
    companyAddress: String,
    officePhone: String
  },
  // Income Details
  incomeDetails: {
    monthlyIncome: { type: Number, required: true },
    otherIncome: { type: Number, default: 0 },
    existingEMI: { type: Number, default: 0 },
    bankName: String,
    accountNumber: String,
    ifscCode: String
  },
  // Loan Requirements
  loanRequirements: {
    loanType: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    loanPurpose: String,
    tenureMonths: Number
  },
  // Smart Calculation Results
  eligibilityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  recommendedInterestRate: Number,
  maxEligibleAmount: Number,
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'disbursed'],
    default: 'pending'
  },
  adminNotes: String,
  rejectionReason: String,
  approvedAmount: Number,
  approvedInterestRate: Number,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date
}, {
  timestamps: true
});

// Auto-generate application number before save
applicationSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Application').countDocuments();
    this.applicationNumber = `FP${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema);
