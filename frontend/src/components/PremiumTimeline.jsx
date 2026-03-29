import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: 1,
    icon: '📝',
    title: 'Fill Application',
    description: 'Complete your loan application in under 2 minutes with basic information',
    details: ['Name & Contact', 'Employment Type', 'Loan Amount Needed'],
  },
  {
    number: 2,
    icon: '✅',
    title: 'Instant Eligibility',
    description: 'Our AI engine instantly checks your eligibility across 50+ lenders',
    details: ['Zero Credit Impact', 'Instant Decision', 'Best Offers Matched'],
  },
  {
    number: 3,
    icon: '📤',
    title: 'Upload Documents',
    description: 'Submit required documents digitally. Secure upload with verification',
    details: ['ID Proof', 'Income Proof', 'Bank Statements'],
  },
  {
    number: 4,
    icon: '💰',
    title: 'Funds Disbursed',
    description: 'Get loan approval and funds transferred to your account instantly',
    details: ['Fast Processing', 'Same-Day Disbursal', 'No Hidden Charges'],
  },
];

export default function PremiumTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-700 text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-400">
            Get your loan approved in 4 simple steps. Fast, transparent, and hassle-free
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Desktop Timeline */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} variants={itemVariants} className="relative">
                {/* Card */}
                <div className="group relative">
                  <div className="relative bg-white dark:bg-slate-800 rounded-none p-8 border border-gray-200 dark:border-slate-700 h-full transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:shadow-lg">
                    {/* Step Number Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 400 }}
                        className="w-12 h-12 rounded-none bg-blue-600 text-white font-600 flex items-center justify-center shadow-md text-lg border-4 border-white dark:border-slate-800"
                      >
                        {step.number}
                      </motion.div>
                    </div>

                    {/* Icon */}
                    <div className="text-4xl mb-4 mt-2">{step.icon}</div>

                    {/* Content */}
                    <h3 className="text-xl font-700 text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-400">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-500">
                          <div className="w-1.5 h-1.5 rounded-none bg-blue-600" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector Arrow */}
                {i < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-12 -right-3 z-20">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + 0.4 }}
                    >
                      <FiArrowRight size={28} className="text-blue-600 dark:text-blue-500" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, i) => (
              <motion.div key={i} variants={itemVariants} className="relative">
                <div className="flex gap-6">
                  {/* Timeline Dot and Line */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.2, type: 'spring' }}
                      className="w-12 h-12 rounded-none bg-blue-600 text-white font-600 flex items-center justify-center shadow-md text-lg border-4 border-white dark:border-slate-800 z-10"
                    >
                      {step.number}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className="w-1 h-16 bg-blue-600 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-6 pt-1 flex-1">
                    <div className="bg-white dark:bg-slate-800 rounded-none p-6 border border-gray-200 dark:border-slate-700">
                      <div className="text-3xl mb-3">{step.icon}</div>
                      <h3 className="text-lg font-700 text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-400">
                        {step.description}
                      </p>
                      <div className="space-y-2">
                        {step.details.map((detail, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-500">
                            <div className="w-1.5 h-1.5 rounded-none bg-blue-600" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <Link to="/apply" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-lg">
            Start Your Application
            <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
