import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoanCard from '../components/LoanCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQAccordion from '../components/FAQAccordion';
import HeroSection from '../components/HeroSection';
import PremiumTimeline from '../components/PremiumTimeline';
import FeaturesSection from '../components/FeaturesSection';
import PartnersSection from '../components/PartnersSection';
import CTASection from '../components/CTASection';
import TrustSection from '../components/TrustSection';
import MobileStickyCTA from '../components/MobileStickyCTA';
import { loanAPI } from '../services/api';
import { FiSearch } from 'react-icons/fi';

const loanCategories = [
  { type: 'personal', icon: '👤', label: 'Personal Loan', desc: 'Up to ₹40L', color: 'from-violet-500 to-purple-600' },
  { type: 'business', icon: '🏢', label: 'Business Loan', desc: 'Up to ₹5Cr', color: 'from-blue-500 to-cyan-600' },
  { type: 'home', icon: '🏠', label: 'Home Loan', desc: 'Up to ₹7.5Cr', color: 'from-emerald-500 to-teal-600' },
  { type: 'education', icon: '🎓', label: 'Education Loan', desc: 'Up to ₹75L', color: 'from-orange-500 to-amber-600' },
  { type: 'creditCard', icon: '💳', label: 'Credit Card', desc: 'Instant Approval', color: 'from-pink-500 to-rose-600' },
  { type: 'vehicle', icon: '🚗', label: 'Vehicle Loan', desc: 'Up to ₹75L', color: 'from-indigo-500 to-blue-600' },
];

export default function LandingPage() {
  const [loans, setLoans] = useState([]);
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingLoans, setLoadingLoans] = useState(true);

  useEffect(() => {
    fetchLoans();
  }, [activeType]);

  const fetchLoans = async () => {
    setLoadingLoans(true);
    try {
      const { data } = await loanAPI.getAll({ type: activeType !== 'all' ? activeType : undefined, search: searchQuery });
      setLoans(data.data || []);
    } catch {
      // Use mock data if backend not running
      setLoans([]);
    } finally {
      setLoadingLoans(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── TRUST & SECURITY SECTION ─────────────────────────────────── */}
      <TrustSection />

      {/* ─── HOW IT WORKS SECTION (Premium Timeline) ──────────────────── */}
      <PremiumTimeline />

      {/* ─── FEATURES SECTION ───────────────────────────────────────── */}
      <FeaturesSection />

      {/* ─── PARTNERS SECTION ───────────────────────────────────────── */}
      <PartnersSection />

      {/* ─── LOAN PRODUCTS ──────────────────────────────────────────── */}
      <section id="loans" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-700 text-slate-900 dark:text-white mb-6">
              Find Your Perfect Loan
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-400">
              Filter and compare loan products with instant eligibility checks and best rates
            </p>
          </motion.div>

          {/* Filter + Search */}
          <div className="flex flex-wrap gap-3 items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {['all', 'personal', 'business', 'home', 'education'].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-3 rounded-none text-sm font-600 transition-all duration-200 capitalize ${
                    activeType === type 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {type === 'all' ? 'All Loans' : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </button>
              ))}
            </div>
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search loan..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); fetchLoans(); }}
                className="pl-12 pr-6 py-3 rounded-none bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {loadingLoans ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <div key={i} className="h-72 rounded-none bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
            </div>
          ) : loans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loans.map((loan, i) => <LoanCard key={loan._id} loan={loan} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <div className="text-6xl mb-4">💳</div>
              <p className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">No products found</p>
              <p className="text-base">Make sure your backend is running and seeded with data</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ──────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-700 text-slate-900 dark:text-white mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-400">
              Join thousands of satisfied customers who've achieved their financial goals with FinancePaisa
            </p>
          </motion.div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ─── FAQ SECTION ────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-700 text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-400">
              Find answers to common questions about our loan products and application process
            </p>
          </motion.div>
          <FAQAccordion />
        </div>
      </section>

      {/* ─── CTA SECTION ────────────────────────────────────────────── */}
      <CTASection />

      <Footer />

      {/* ─── MOBILE STICKY CTA ──────────────────────────────────────── */}
      <MobileStickyCTA />
    </div>
  );
}
