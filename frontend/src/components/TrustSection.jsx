import { motion } from 'framer-motion';
import { RiShieldCheckLine, RiVipCrown2Line, RiStarSmileLine } from 'react-icons/ri';

const trustItems = [
  {
    icon: RiShieldCheckLine,
    title: '100% Secure Platform',
    description: 'Bank-grade encryption protects your data with SSL 256-bit security standards',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
  {
    icon: RiVipCrown2Line,
    title: 'RBI Registered Partners',
    description: 'All lending partners are licensed and regulated by Reserve Bank of India',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
  {
    icon: RiStarSmileLine,
    title: '4.8/5 Customer Rating',
    description: 'Trusted by 15+ Lakhs customers across India with 98% approval rate',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-700 text-slate-900 dark:text-white mb-4">
            Trusted by Millions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-400">
            Finance Paisa is backed by industry-leading security, regulatory compliance, and customer satisfaction
          </p>
        </motion.div>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className={`relative h-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-none p-8 transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:shadow-lg`}>
                  {/* Icon Container */}
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-none bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-6`}
                  >
                    <Icon size={32} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-700 text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-400">
                    {item.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transition-all duration-300 group-hover:h-1" style={{ width: '0%', marginLeft: '0' }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-200 dark:border-slate-800"
        >
          {[
            { number: '15L+', label: 'Happy Users' },
            { number: '50+', label: 'Bank Partners' },
            { number: '98%', label: 'Approval Rate' },
            { number: '₹8500Cr+', label: 'Disbursed' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-700 text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
