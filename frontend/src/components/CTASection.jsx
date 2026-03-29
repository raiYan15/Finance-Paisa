import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Main Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-700 text-white mb-8 leading-tight max-w-3xl mx-auto">
            Ready to Get Your Loan?
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-400">
            Join 15+ lakh Indians who've trusted FinancePaisa for instant loans, competitive rates, and exceptional service.
          </p>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {['⚡ 5-Minute Approval', '🔒 100% Secure', '📱 Digital Process'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white font-600 text-lg">
                <span className="text-2xl">{item.split(' ')[0]}</span>
                <span>{item.split(' ', 1)[1]}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link 
              to="/apply"
              className="group px-12 py-4 bg-white text-blue-600 font-700 rounded-none hover:shadow-lg transition-all duration-300 text-lg flex items-center gap-3"
            >
              Apply Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#faq"
              className="group px-12 py-4 border-2 border-white text-white font-600 rounded-none hover:bg-white/10 transition-all duration-300 text-lg flex items-center gap-3"
            >
              Learn More
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Bottom text */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/70 mt-8 text-sm font-400"
          >
            No hidden charges • No paperwork • Instant verification
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
