import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSliders } from 'react-icons/fi';

export default function PremiumLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000); // ₹5L default
  const [tenure, setTenure] = useState(60); // 60 months default
  const [interestRate, setInterestRate] = useState(12); // 12% default

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  // Calculate EMI
  const emi = useMemo(() => {
    if (loanAmount <= 0 || tenure <= 0 || interestRate <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = tenure;
    const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments);
    const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
    return Math.round(numerator / denominator);
  }, [loanAmount, tenure, interestRate]);

  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${val}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full max-w-md"
    >
      <div className="relative bg-white dark:bg-slate-800 rounded-none p-8 border border-gray-200 dark:border-slate-700 shadow-lg">
        {/* Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-none bg-blue-600 text-white">
              <FiSliders size={20} />
            </div>
            <h3 className="text-lg font-700 text-slate-900 dark:text-white">Loan Calculator</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Check your estimated EMI instantly</p>
        </div>

        {/* Loan Amount Slider */}
        <div className="relative z-10 mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-600 text-slate-700 dark:text-slate-300">Loan Amount</label>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-none font-700 text-sm">
                {formatCurrency(loanAmount)}
              </div>
              <input
                type="number"
                min="100000"
                max="5000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => {
                  if (e.target.value === '') return;
                  const nextValue = clamp(Number(e.target.value), 100000, 5000000);
                  setLoanAmount(Math.round(nextValue / 50000) * 50000);
                }}
                className="w-28 px-2 py-1.5 text-xs font-600 border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter loan amount manually"
              />
            </div>
          </div>
          <input
            type="range"
            min="100000"
            max="5000000"
            step="50000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-none appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((loanAmount - 100000) / (5000000 - 100000)) * 100}%, #e2e8f0 ${((loanAmount - 100000) / (5000000 - 100000)) * 100}%, #e2e8f0 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span>₹1L</span>
            <span>₹50L</span>
          </div>
        </div>

        {/* Tenure Slider */}
        <div className="relative z-10 mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-600 text-slate-700 dark:text-slate-300">Tenure (Months)</label>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-none font-700 text-sm">
                {tenure} months
              </div>
              <input
                type="number"
                min="12"
                max="84"
                step="1"
                value={tenure}
                onChange={(e) => {
                  if (e.target.value === '') return;
                  const nextValue = clamp(Number(e.target.value), 12, 84);
                  setTenure(nextValue);
                }}
                className="w-20 px-2 py-1.5 text-xs font-600 border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter tenure in months manually"
              />
            </div>
          </div>
          <input
            type="range"
            min="12"
            max="84"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-none appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((tenure - 12) / (84 - 12)) * 100}%, #e2e8f0 ${((tenure - 12) / (84 - 12)) * 100}%, #e2e8f0 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span>1 Year</span>
            <span>7 Years</span>
          </div>
        </div>

        {/* Interest Rate Slider */}
        <div className="relative z-10 mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-600 text-slate-700 dark:text-slate-300">Interest Rate (p.a.)</label>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-none font-700 text-sm">
                {interestRate.toFixed(1)}%
              </div>
              <input
                type="number"
                min="8"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => {
                  if (e.target.value === '') return;
                  const nextValue = clamp(Number(e.target.value), 8, 20);
                  setInterestRate(Math.round(nextValue * 10) / 10);
                }}
                className="w-20 px-2 py-1.5 text-xs font-600 border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter interest rate manually"
              />
            </div>
          </div>
          <input
            type="range"
            min="8"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-none appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((interestRate - 8) / (20 - 8)) * 100}%, #e2e8f0 ${((interestRate - 8) / (20 - 8)) * 100}%, #e2e8f0 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span>8%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Results - Simple Cards */}
        <div className="relative z-10 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 dark:bg-green-950/30 rounded-none p-4 border border-green-200 dark:border-green-700/50"
          >
            <div className="text-xs font-600 text-green-700 dark:text-green-400 mb-1">Monthly EMI</div>
            <div className="text-3xl font-700 text-green-600 dark:text-green-400">{formatCurrency(emi)}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-none p-4 border border-blue-200 dark:border-blue-700/50">
              <div className="text-xs font-600 text-blue-700 dark:text-blue-400 mb-1">Total Amount</div>
              <div className="text-xl font-700 text-blue-600 dark:text-blue-400">{formatCurrency(totalAmount)}</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-950/30 rounded-none p-4 border border-gray-200 dark:border-gray-700/50">
              <div className="text-xs font-600 text-gray-700 dark:text-gray-400 mb-1">Total Interest</div>
              <div className="text-xl font-700 text-gray-600 dark:text-gray-400">{formatCurrency(totalInterest)}</div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 w-full mt-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <span>Apply Now with This Amount</span>
          <span className="text-lg">→</span>
        </motion.button>
      </div>

      <style jsx>{`
        /* Custom slider styling */
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #2563EB;
          border: 2px solid white;
          border-radius: 0;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
          transition: all 0.2s ease;
        }

        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }

        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #2563EB;
          border: 2px solid white;
          border-radius: 0;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
          transition: all 0.2s ease;
        }

        input[type='range']::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
      `}</style>
    </motion.div>
  );
}
