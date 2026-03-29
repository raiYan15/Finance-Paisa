import { motion } from 'framer-motion';

export default function PartnersSection() {
  const partners = [
    { name: 'HDFC Bank', initials: 'HD', color: '#0066B2', bgColor: '#E8F1FB' },
    { name: 'ICICI Bank', initials: 'IC', color: '#DC143C', bgColor: '#FFE8EC' },
    { name: 'SBI', initials: 'SB', color: '#F37021', bgColor: '#FEF3EB' },
    { name: 'Axis Bank', initials: 'AB', color: '#003087', bgColor: '#E8ECF8' },
    { name: 'Kotak Bank', initials: 'KB', color: '#1E90FF', bgColor: '#E8F4FF' },
    { name: 'LIC HFL', initials: 'LH', color: '#2E5090', bgColor: '#EEF1F7' },
    { name: 'Bajaj Finance', initials: 'BJ', color: '#8B3A3A', bgColor: '#F8E8E8' },
    { name: 'IDFC FIRST', initials: 'IF', color: '#003366', bgColor: '#E8F0F8' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-700 text-slate-900 dark:text-white mb-6">
            Trusted Bank Partners
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-400">
            We work with India's most trusted financial institutions to bring you the best rates and service
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-none p-6 h-24 flex flex-col items-center justify-center group-hover:shadow-lg dark:group-hover:shadow-blue-900/30 transition-all duration-300 border border-slate-200 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 cursor-pointer">
                {/* Brand Logo Background */}
                <div 
                  className="w-12 h-12 rounded-none flex items-center justify-center mb-2 transition-all duration-300 group-hover:shadow-md"
                  style={{ backgroundColor: partner.bgColor }}
                >
                  <span 
                    className="text-lg font-700"
                    style={{ color: partner.color }}
                  >
                    {partner.initials}
                  </span>
                </div>
                <p className="text-center text-xs font-600 text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {partner.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
