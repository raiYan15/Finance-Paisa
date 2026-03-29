import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiArrowRight } from 'react-icons/fi';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling down 800px
      if (window.scrollY > 800) {
        setIsVisible(true);
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-slate-900 pointer-events-none" />

          {/* Content */}
          <div className="relative p-4 flex gap-3 items-center justify-between">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <div className="text-white">
                <div className="font-600 text-sm">Ready to Apply?</div>
                <div className="text-xs text-slate-300 font-400">Get approved in minutes</div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-2"
            >
              <Link
                to="/apply"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1 whitespace-nowrap text-sm"
              >
                Apply Now
                <FiArrowRight size={16} />
              </Link>
              <button
                onClick={() => setIsVisible(false)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-none transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </motion.div>
          </div>

          {/* Border Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-blue-600/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
