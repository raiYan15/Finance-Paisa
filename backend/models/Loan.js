const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['personal', 'business', 'home', 'education', 'creditCard', 'vehicle', 'gold'],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  bankName: {
    type: String,
    required: true
  },
  bankLogo: String,
  interestRate: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  loanAmount: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  tenure: {
    min: { type: Number },  // months
    max: { type: Number }
  },
  processingFee: {
    type: Number,
    default: 0
  },
  features: [String],
  eligibilityCriteria: {
    minAge: { type: Number, default: 21 },
    maxAge: { type: Number, default: 60 },
    minIncome: { type: Number },
    minCreditScore: { type: Number, default: 650 },
    employmentTypes: [{ type: String, enum: ['salaried', 'self-employed', 'business', 'any'] }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  },
  disbursalTime: String,
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Loan', loanSchema);
