import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import PremiumLoanCalculator from './PremiumLoanCalculator';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950 pt-20">
      {/* Minimal Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Very subtle background color only */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-none border border-blue-200 dark:border-blue-800/50">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-600 text-blue-900 dark:text-blue-100">⭐ Trusted by 10,000+ users</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl font-700 leading-tight mb-8 dark:text-white text-slate-900"
            >
              Instant Loans,<br />
              <span className="text-blue-600">Zero Paperwork</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-xl font-400"
            >
              Get approved in minutes. Funds in your account the same day. Apply online, completely secure, and RBI-regulated.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link 
                to="/apply"
                className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none transition-all duration-300 flex items-center gap-2 group text-base"
              >
                Apply Now
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <a 
                href="#calculator"
                className="px-10 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-600 rounded-none hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors duration-300 text-base"
              >
                Check Eligibility
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {['🔒 100% Secure', '🏦 RBI Registered', '⚡ Instant Approval'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-5 h-5 rounded-none bg-green-100 dark:bg-green-950 flex items-center justify-center">
                    <FiCheck className="text-green-600 dark:text-green-400 font-600 text-sm" />
                  </div>
                  <span className="font-500 text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Premium Loan Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex justify-center"
            id="calculator"
          >
            <PremiumLoanCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
