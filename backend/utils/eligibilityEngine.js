/**
 * AI-based Eligibility Engine for Finance Paisa
 * Calculates eligibility score (0-100) and recommends loans
 */

/**
 * Calculate eligibility score from application data
 */
const calculateEligibilityScore = (data) => {
  let score = 0;
  const { monthlyIncome, existingEMI, loanAmount, employmentType, creditScore, workExperience } = data;

  // 1. Income Score (0-30 pts)
  const netMonthlyIncome = monthlyIncome - (existingEMI || 0);
  const emiToIncomeRatio = loanAmount / (netMonthlyIncome * 60); // assuming 5yr tenor
  if (emiToIncomeRatio < 0.3) score += 30;
  else if (emiToIncomeRatio < 0.4) score += 22;
  else if (emiToIncomeRatio < 0.5) score += 14;
  else if (emiToIncomeRatio < 0.6) score += 6;

  // 2. Credit Score (0-30 pts)
  if (creditScore) {
    if (creditScore >= 800) score += 30;
    else if (creditScore >= 750) score += 25;
    else if (creditScore >= 700) score += 18;
    else if (creditScore >= 650) score += 10;
    else score += 2;
  } else {
    score += 10; // default if no credit score
  }

  // 3. Employment Type (0-20 pts)
  const empScores = { salaried: 20, business: 16, 'self-employed': 12, retired: 8, other: 5 };
  score += empScores[employmentType] || 5;

  // 4. Work Experience (0-10 pts)
  if (workExperience >= 5) score += 10;
  else if (workExperience >= 3) score += 7;
  else if (workExperience >= 1) score += 4;
  else score += 1;

  // 5. Income level bonus (0-10 pts)
  if (monthlyIncome >= 100000) score += 10;
  else if (monthlyIncome >= 50000) score += 7;
  else if (monthlyIncome >= 30000) score += 4;
  else if (monthlyIncome >= 20000) score += 2;

  return Math.min(Math.max(Math.round(score), 0), 100);
};

/**
 * Calculate recommended interest rate based on score
 */
const getRecommendedRate = (score, loanType) => {
  const baseRates = {
    personal: { min: 10.5, max: 24 },
    business: { min: 12, max: 26 },
    home: { min: 8.5, max: 14 },
    education: { min: 9, max: 15 },
    vehicle: { min: 9.5, max: 16 },
    creditCard: { min: 18, max: 36 },
    gold: { min: 9, max: 16 }
  };
  const rates = baseRates[loanType] || baseRates.personal;
  // Higher score = lower interest rate
  const rate = rates.max - ((score / 100) * (rates.max - rates.min));
  return Math.round(rate * 100) / 100;
};

/**
 * Calculate maximum eligible loan amount
 */
const getMaxEligibleAmount = (monthlyIncome, existingEMI, score) => {
  const netIncome = monthlyIncome - (existingEMI || 0);
  const maxEMI = netIncome * 0.5; // 50% FOIR
  const tenureMonths = 60;
  const rate = 14 - (score / 100) * 5; // interest rate 9-14%
  const monthlyRate = rate / (12 * 100);
  // Max loan = EMI * [(1+r)^n - 1] / [r * (1+r)^n]
  const maxAmount = maxEMI * (Math.pow(1 + monthlyRate, tenureMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
  return Math.round(maxAmount / 1000) * 1000;
};

/**
 * Recommend loan products based on eligibility
 */
const recommendLoans = (loans, score, loanType, loanAmount) => {
  return loans
    .filter(loan => {
      const matchesType = loan.type === loanType || loanType === 'any';
      const meetsMin = loan.eligibilityCriteria?.minCreditScore
        ? score >= (loan.eligibilityCriteria.minCreditScore - 650) * 0.1  // rough map
        : true;
      const amountFits = loanAmount >= loan.loanAmount.min && loanAmount <= loan.loanAmount.max;
      return matchesType && meetsMin && amountFits;
    })
    .sort((a, b) => a.interestRate.min - b.interestRate.min)
    .slice(0, 5);
};

module.exports = { calculateEligibilityScore, getRecommendedRate, getMaxEligibleAmount, recommendLoans };
