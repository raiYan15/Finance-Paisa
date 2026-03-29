import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function ServicesSection() {
  const services = [
    {
      icon: '👤',
      title: 'Personal Loan',
      description: 'Flexible personal loans up to ₹40 lakhs for any need.',
      amount: 'Up to ₹40L',
      color: 'from-violet-500 to-purple-600',
      highlight: true
    },
    {
      icon: '🏢',
      title: 'Business Loan',
      description: 'Grow your business with quick funding up to ₹5 crores.',
      amount: 'Up to ₹5Cr',
      color: 'from-blue-500 to-cyan-600',
      highlight: true
    },
    {
      icon: '🏠',
      title: 'Home Loan',
      description: 'Affordable home loans with lowest interest rates.',
      amount: 'Up to ₹7.5Cr',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: '📚',
      title: 'Education Loan',
      description: 'Fund your education with our special education plans.',
      amount: 'Up to ₹75L',
      color: 'from-orange-500 to-amber-600'
    },
    {
      icon: '💳',
      title: 'Credit Card',
      description: 'Instant approval credit cards with premium benefits.',
      amount: 'Instant Approval',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: '🚗',
      title: 'Vehicle Loan',
      description: 'Quick vehicle financing for your dream car.',
      amount: 'Up to ₹75L',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 right-0 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-1/3 left-0 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />
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
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest mb-4">Our Services</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Loan & Financial Products
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose from a wide range of financial products tailored to your needs and financial goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`relative group ${service.highlight ? 'lg:col-span-1' : ''}`}
            >
              {/* Highlight border for featured services */}
              {service.highlight && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Card */}
              <div className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/30 transition-all duration-300 border ${
                service.highlight ? 'border-blue-200 dark:border-blue-800 group-hover:border-blue-600' : 'border-slate-200 dark:border-slate-700'
              } h-full flex flex-col`}>
                {/* Badge for featured */}
                {service.highlight && (
                  <div className="absolute -top-4 right-6 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`text-6xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>

                {/* Amount */}
                <p className="text-sm font-bold text-blue-600 dark:text-cyan-400 mb-4">
                  {service.amount}
                </p>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                {/* CTA Button */}
                <Link 
                  to="/apply"
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                    service.highlight 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/40' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Learn More
                  <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
