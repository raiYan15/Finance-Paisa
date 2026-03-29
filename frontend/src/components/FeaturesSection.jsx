import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { RiShieldCheckLine, RiTimeLine, RiMoneyDollarCircleLine, RiCustomerService2Line } from 'react-icons/ri';

export default function FeaturesSection() {
  const features = [
    {
      icon: <RiTimeLine className="text-4xl" />,
      title: 'Instant Approval',
      description: 'Get approval in under 5 minutes with our AI-powered eligibility system. No waiting, no hassle.',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: <RiMoneyDollarCircleLine className="text-4xl" />,
      title: 'Best Interest Rates',
      description: 'Compare 50+ banks and find the lowest rates. We guarantee competitive pricing every time.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: <RiShieldCheckLine className="text-4xl" />,
      title: '100% Secure',
      description: 'Bank-grade 256-bit SSL encryption. Your sensitive data is protected with military-grade security.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <RiCustomerService2Line className="text-4xl" />,
      title: '24/7 Support',
      description: 'Our expert loan advisors are available round the clock to guide you through every step.',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest mb-4">Why Choose Us</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Premium Features Built for You
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We've simplified lending. No unnecessary complexity, just smart solutions that work for you.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative bg-white dark:bg-slate-800 rounded-none p-8 shadow-sm hover:shadow-lg dark:hover:shadow-blue-900/30 transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full">
                {/* Icon */}
                <div className="w-16 h-16 rounded-none bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-700 text-slate-900 dark:text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-400">
                  {feature.description}
                </p>

                {/* Check marks */}
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCheck className="font-700 text-lg" />
                  <span className="text-sm font-500">Available now</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
