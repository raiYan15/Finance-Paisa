import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center text-center p-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-9xl font-700 text-blue-600 dark:text-blue-400 mb-4">404</div>
        <h1 className="text-3xl font-700 text-slate-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <Link to="/" className="btn-primary px-8 py-3.5 rounded-none inline-flex items-center gap-2 font-600">
          Go to Home <FiArrowRight />
        </Link>
      </motion.div>
    </div>
  );
}
