import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPercent, FiClock } from 'react-icons/fi';
import { RiMoneyDollarCircleLine, RiStarFill } from 'react-icons/ri';

const loanTypeIcons = {
  personal: '👤',
  business: '🏢',
  home: '🏠',
  education: '🎓',
  creditCard: '💳',
  vehicle: '🚗',
  gold: '🪙',
};

const formatCurrency = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
};

export default function LoanCard({ loan, index = 0 }) {
  const icon = loanTypeIcons[loan.type] || '💰';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative bg-white dark:bg-slate-800 rounded-none p-8 border border-gray-200 dark:border-slate-700 h-full transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-600 mb-3">
              <span>{icon}</span>
              <span className="capitalize">{loan.type}</span>
            </div>
            <h3 className="font-700 text-slate-900 dark:text-white text-lg leading-tight">{loan.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-400">{loan.bankName}</p>
          </div>
          <motion.div 
            className="flex items-center gap-1 text-amber-500"
            whileHover={{ scale: 1.05 }}
          >
            <RiStarFill size={14} className="fill-amber-500" />
            <span className="font-600 text-slate-700 dark:text-slate-300 text-sm">{loan.rating}</span>
          </motion.div>
        </div>

        {/* Highlight - Interest Rate */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 bg-blue-50 dark:bg-blue-950/20 rounded-none p-4 border border-blue-200 dark:border-blue-700/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-600 text-blue-700 dark:text-blue-400 uppercase tracking-wider">Interest Rate</p>
              <p className="text-2xl font-700 text-blue-600 dark:text-blue-400 mt-1">{loan.interestRate.min}% p.a.</p>
            </div>
            <div className="text-3xl opacity-30">📊</div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-none bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 group-hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <RiMoneyDollarCircleLine className="text-blue-600 dark:text-blue-400 text-sm" />
              <p className="text-xs text-slate-600 dark:text-slate-400 font-600">Max Amount</p>
            </div>
            <p className="text-sm font-700 text-slate-900 dark:text-white">{formatCurrency(loan.loanAmount.max)}</p>
          </div>
          <div className="p-3 rounded-none bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 group-hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <FiClock className="text-blue-600 dark:text-blue-400 text-sm" />
              <p className="text-xs text-slate-600 dark:text-slate-400 font-600">Disbursal</p>
            </div>
            <p className="text-sm font-700 text-slate-900 dark:text-white">{loan.disbursalTime?.split(' ')[0]}</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {loan.features?.slice(0, 3).map((f, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="text-xs px-3 py-1.5 rounded-none bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 font-600 border border-blue-200 dark:border-blue-700/50"
            >
              {f}
            </motion.span>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-slate-700"
        >
          <Link
            to="/apply"
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm"
          >
            Apply Now
          </Link>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-none bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
          >
            <FiArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
