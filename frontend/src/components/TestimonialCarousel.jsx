import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RiStarFill } from 'react-icons/ri';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    location: 'Pune',
    avatar: '👩‍💻',
    rating: 5,
    text: 'Got my ₹3L personal loan approved in just 18 hours! The process was completely online and paperless. Finance Paisa is genuinely fast!',
    loan: 'Personal Loan - ₹3L',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    location: 'Delhi',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Applied for a business loan of ₹25L for expanding my shop. They matched me with the best offer from SBI at 13.5% which was much better than expected.',
    loan: 'Business Loan - ₹25L',
  },
  {
    name: 'Anita Mehta',
    role: 'Teacher',
    location: 'Mumbai',
    avatar: '👩‍🏫',
    rating: 5,
    text: 'The eligibility check was instant and saved me from applying to wrong banks. Took my home loan of 45L at 8.7% from LIC Housing Finance.',
    loan: 'Home Loan - ₹45L',
  },
  {
    name: 'Vikram Singh',
    role: 'Freelancer',
    location: 'Bangalore',
    avatar: '💻',
    rating: 5,
    text: 'As a self-employed person, getting loans was always tough. Finance Paisa found lenders who specifically cater to freelancers. Excellent!',
    loan: 'Personal Loan - ₹7L',
  },
  {
    name: 'Deepa Nair',
    role: 'Doctor',
    location: 'Kochi',
    avatar: '👩‍⚕️',
    rating: 5,
    text: 'Applied for an education loan for my daughter. Document upload was simple and loan was sanctioned quickly. Made this stressful process easy!',
    loan: 'Education Loan - ₹12L',
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => setCurrent(c => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const t = testimonials[current];

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-50 dark:bg-blue-950/20 rounded-none p-8 md:p-12 border border-blue-200 dark:border-blue-700/30 shadow-lg"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Star Rating */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-1 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <RiStarFill 
                key={i} 
                className={`text-lg ${i < t.rating ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'}`}
              />
            ))}
          </motion.div>

          {/* Quote */}
          <motion.blockquote 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-800 dark:text-slate-100 leading-relaxed mb-10 font-400"
          >
            "{t.text}"
          </motion.blockquote>

          {/* Author Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-none p-6 border border-gray-200 dark:border-slate-700 flex items-center gap-4"
          >
            {/* Avatar */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-none bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-4xl flex-shrink-0">
              {t.avatar}
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <div className="font-700 text-slate-900 dark:text-white text-lg">{t.name}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-400 mb-1">{t.role} • {t.location}</div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-blue-100 dark:bg-blue-900/40">
                <span className="text-xs font-600 text-blue-700 dark:text-blue-300">{t.loan}</span>
              </div>
            </div>

            {/* Verification Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl"
            >
              ✅
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-4 mt-10"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev} 
          className="w-12 h-12 rounded-none bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-white hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-md"
        >
          <FiChevronLeft size={24} />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <motion.button 
              key={i} 
              onClick={() => setCurrent(i)}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: current === i ? 1 : 0.8,
                width: current === i ? 32 : 10,
              }}
              className={`h-2.5 rounded-none transition-all duration-300 ${
                current === i 
                  ? 'bg-blue-600' 
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={next} 
          className="w-12 h-12 rounded-none bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-white hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-md"
        >
          <FiChevronRight size={24} />
        </motion.button>
      </motion.div>

      {/* Pagination Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 font-400">
          <span className="font-600 text-blue-600 dark:text-blue-400">{current + 1}</span> of {testimonials.length} success stories
        </p>
      </motion.div>
    </div>
  );
}
