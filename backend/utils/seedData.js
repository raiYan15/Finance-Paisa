require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Loan = require('../models/Loan');
const Application = require('../models/Application');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB for seeding...');
};

const seedLoans = [
  {
    type: 'personal',
    name: 'Quick Personal Loan',
    bankName: 'HDFC Bank',
    interestRate: { min: 10.5, max: 21 },
    loanAmount: { min: 50000, max: 4000000 },
    tenure: { min: 12, max: 60 },
    processingFee: 1,
    features: ['Instant approval', 'No collateral', 'Flexible repayment', 'Minimal documentation'],
    eligibilityCriteria: { minAge: 21, maxAge: 60, minIncome: 25000, minCreditScore: 700, employmentTypes: ['salaried', 'self-employed'] },
    rating: 4.7,
    disbursalTime: '24-48 hours',
    description: 'Get instant personal loans with minimal documentation and competitive interest rates.'
  },
  {
    type: 'personal',
    name: 'Flexi Personal Loan',
    bankName: 'ICICI Bank',
    interestRate: { min: 11, max: 22 },
    loanAmount: { min: 100000, max: 5000000 },
    tenure: { min: 12, max: 72 },
    processingFee: 1.5,
    features: ['Instant disbursal', 'Zero prepayment', 'Online application', 'Doorstep service'],
    eligibilityCriteria: { minAge: 23, maxAge: 58, minIncome: 30000, minCreditScore: 720, employmentTypes: ['salaried'] },
    rating: 4.5,
    disbursalTime: '12-24 hours',
    description: 'Flexible personal loans with no prepayment charges and online management.'
  },
  {
    type: 'business',
    name: 'Business Growth Loan',
    bankName: 'SBI Bank',
    interestRate: { min: 12, max: 18 },
    loanAmount: { min: 500000, max: 50000000 },
    tenure: { min: 12, max: 84 },
    processingFee: 0.5,
    features: ['High loan amount', 'Long tenure', 'Collateral not always required', 'Working capital support'],
    eligibilityCriteria: { minAge: 25, maxAge: 65, minIncome: 50000, minCreditScore: 680, employmentTypes: ['business', 'self-employed'] },
    rating: 4.3,
    disbursalTime: '3-5 business days',
    description: 'Fuel your business growth with our competitive business loans up to 5 crore.'
  },
  {
    type: 'home',
    name: 'Dream Home Loan',
    bankName: 'LIC Housing Finance',
    interestRate: { min: 8.5, max: 12 },
    loanAmount: { min: 1000000, max: 75000000 },
    tenure: { min: 60, max: 360 },
    processingFee: 0.5,
    features: ['Lowest interest rate', 'Up to 30 years tenure', 'Tax benefits', 'Balance transfer option'],
    eligibilityCriteria: { minAge: 21, maxAge: 65, minIncome: 20000, minCreditScore: 650, employmentTypes: ['salaried', 'self-employed', 'business'] },
    rating: 4.6,
    disbursalTime: '7-10 business days',
    description: 'Own your dream home with one of Indias lowest home loan interest rates.'
  },
  {
    type: 'education',
    name: 'Education Excellence Loan',
    bankName: 'Axis Bank',
    interestRate: { min: 9, max: 15 },
    loanAmount: { min: 100000, max: 7500000 },
    tenure: { min: 12, max: 120 },
    processingFee: 0,
    features: ['No processing fee', 'Covers all expenses', 'Moratorium period', 'Tax benefits under 80E'],
    eligibilityCriteria: { minAge: 18, maxAge: 35, minIncome: 0, minCreditScore: 0, employmentTypes: ['any'] },
    rating: 4.4,
    disbursalTime: '5-7 business days',
    description: 'Invest in education with zero processing fee and moratorium till course completion.'
  },
  {
    type: 'creditCard',
    name: 'Rewards Credit Card',
    bankName: 'Kotak Mahindra Bank',
    interestRate: { min: 18, max: 36 },
    loanAmount: { min: 50000, max: 1000000 },
    tenure: { min: 1, max: 12 },
    processingFee: 0,
    features: ['5% cashback on fuel', '2x rewards on grocery', 'Airport lounge access', 'Zero annual fee first year'],
    eligibilityCriteria: { minAge: 21, maxAge: 60, minIncome: 25000, minCreditScore: 700, employmentTypes: ['salaried', 'self-employed'] },
    rating: 4.2,
    disbursalTime: '7-10 business days',
    description: 'Earn rewards on every spend with 5% cashback on fuel and 2x rewards on grocery.'
  },
  {
    type: 'vehicle',
    name: 'Car Loan Express',
    bankName: 'Bajaj Finance',
    interestRate: { min: 9.5, max: 16 },
    loanAmount: { min: 100000, max: 7500000 },
    tenure: { min: 12, max: 84 },
    processingFee: 1,
    features: ['90% funding', 'Quick approval', 'New & used cars', 'No prepayment penalty'],
    eligibilityCriteria: { minAge: 21, maxAge: 65, minIncome: 20000, minCreditScore: 680, employmentTypes: ['salaried', 'self-employed', 'business'] },
    rating: 4.5,
    disbursalTime: '24-48 hours',
    description: 'Drive home your dream car with up to 90% financing and flexible repayment.'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Loan.deleteMany({});
    await Application.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create loans
    const loans = await Loan.insertMany(seedLoans);
    console.log(`✅ Created ${loans.length} loan products`);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'financepaisa7@gmail.com',
      phone: '9876543210',
      password: 'Paisa@123',
      role: 'admin',
      isVerified: true
    });
    console.log(`✅ Admin created: ${admin.email}`);

    // Create test user
    const user = await User.create({
      name: 'Rahul Sharma',
      email: 'user@test.com',
      phone: '9123456789',
      password: 'User@1234',
      role: 'user',
      isVerified: true,
      creditScore: 720,
      address: { city: 'Mumbai', state: 'Maharashtra', pincode: '400001' }
    });
    console.log(`✅ Test user created: ${user.email}`);

    // Create sample applications
    const makeApplicationNumber = (i) => `FP${Date.now().toString().slice(-6)}${String(i).padStart(3, '0')}`;
    const sampleApps = [
      {
        applicationNumber: makeApplicationNumber(1),
        userId: user._id,
        loanId: loans[0]._id,
        personalDetails: { fullName: 'Rahul Sharma', email: 'user@test.com', phone: '9123456789', gender: 'male' },
        employmentDetails: { employmentType: 'salaried', companyName: 'TCS Limited', designation: 'Software Engineer', workExperience: 3 },
        incomeDetails: { monthlyIncome: 75000, existingEMI: 5000 },
        loanRequirements: { loanType: 'personal', loanAmount: 500000, loanPurpose: 'Home renovation', tenureMonths: 36 },
        eligibilityScore: 82,
        recommendedInterestRate: 11.5,
        maxEligibleAmount: 1800000,
        status: 'approved',
        approvedAmount: 500000,
        approvedInterestRate: 11.5
      },
      {
        applicationNumber: makeApplicationNumber(2),
        userId: user._id,
        loanId: loans[2]._id,
        personalDetails: { fullName: 'Rahul Sharma', email: 'user@test.com', phone: '9123456789', gender: 'male' },
        employmentDetails: { employmentType: 'business', companyName: 'Self Business', workExperience: 5 },
        incomeDetails: { monthlyIncome: 120000, existingEMI: 0 },
        loanRequirements: { loanType: 'business', loanAmount: 2000000, loanPurpose: 'Business expansion', tenureMonths: 60 },
        eligibilityScore: 75,
        recommendedInterestRate: 14.0,
        maxEligibleAmount: 5000000,
        status: 'pending'
      },
      {
        applicationNumber: makeApplicationNumber(3),
        userId: user._id,
        loanId: loans[3]._id,
        personalDetails: { fullName: 'Rahul Sharma', email: 'user@test.com', phone: '9123456789', gender: 'male' },
        employmentDetails: { employmentType: 'salaried', companyName: 'TCS Limited', workExperience: 3 },
        incomeDetails: { monthlyIncome: 75000, existingEMI: 0 },
        loanRequirements: { loanType: 'home', loanAmount: 5000000, loanPurpose: 'Purchase flat', tenureMonths: 240 },
        eligibilityScore: 68,
        recommendedInterestRate: 9.5,
        maxEligibleAmount: 4500000,
        status: 'under_review'
      }
    ];

    const applications = await Application.insertMany(sampleApps);
    console.log(`✅ Created ${applications.length} sample applications`);

    console.log(`
    ╔════════════════════════════════════╗
    ║   ✅ SEED DATA COMPLETE            ║
    ╠════════════════════════════════════╣
    ║ Admin: financepaisa7@gmail.com     ║
    ║ Pass:  Paisa@123                   ║
    ║ User:  user@test.com               ║
    ║ Pass:  User@1234                   ║
    ╚════════════════════════════════════╝
    `);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
