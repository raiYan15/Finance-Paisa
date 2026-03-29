import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: '📋',
      title: 'Apply Online',
      description: 'Complete our simple form in under 2 minutes with your basic details.'
    },
    {
      number: '02',
      icon: '🤖',
      title: 'AI Verification',
      description: 'Our smart AI instantly verifies your eligibility and best loan offers.'
    },
    {
      number: '03',
      icon: '📱',
      title: 'Upload Documents',
      description: 'Securely upload KYC documents digitally. Zero paperwork required.'
    },
    {
      number: '04',
      icon: '💰',
      title: 'Receive Funds',
      description: 'Approved amount is disbursed directly to your account same day.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest mb-4">Simple Process</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Get Your Loan in 4 Steps
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our streamlined process gets you from application to funding faster than anyone else.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -8 }} className="group relative">
              {/* Connection line (hidden on mobile) */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              {/* Step Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/30 transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full">
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-black text-blue-600 dark:text-cyan-400">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6">{step.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 text-blue-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiArrowRight className="text-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Link 
            to="/apply"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 text-lg group"
          >
            Start Your Application
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
