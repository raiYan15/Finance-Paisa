import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiUser, FiBriefcase, FiHome, FiBookOpen, FiTruck, FiCreditCard, FiCheck, FiChevronDown, FiArrowRight, FiZap, FiShield, FiPercent, FiUsers } from 'react-icons/fi';

const services = [
  {
    key: 'personal',
    title: 'Personal Loan',
    icon: FiUser,
    description: 'Fast personal loans for medical, travel, wedding, or urgent expenses.',
    highlights: 'Starting from 10.49% p.a. • Up to ₹40L',
    details: {
      explanation: 'Personal loans are unsecured loans with quick disbursal and flexible repayment options.',
      eligibility: ['Age: 21–60 years', 'Stable income source', 'Good repayment history'],
      documents: ['PAN & Aadhaar', 'Salary slips / income proof', 'Recent bank statements'],
      benefits: ['No collateral required', 'Quick approval', 'Flexible tenure options'],
    },
  },
  {
    key: 'business',
    title: 'Business Loan',
    icon: FiBriefcase,
    description: 'Working capital and growth funding for MSMEs and enterprises.',
    highlights: 'Starting from 11.25% p.a. • Up to ₹5Cr',
    details: {
      explanation: 'Business loans help companies manage cash flow, expansion, inventory, and operations.',
      eligibility: ['Business vintage: 1+ years', 'Consistent turnover', 'Basic credit eligibility'],
      documents: ['KYC & business proof', 'ITR / GST returns', 'Bank statements'],
      benefits: ['Higher loan limits', 'Flexible repayment structures', 'Supports growth initiatives'],
    },
  },
  {
    key: 'home',
    title: 'Home Loan',
    icon: FiHome,
    description: 'Affordable home financing for purchase, construction, or balance transfer.',
    highlights: 'Starting from 8.50% p.a. • Up to ₹7.5Cr',
    details: {
      explanation: 'Home loans provide long-tenure financing for residential property with competitive rates.',
      eligibility: ['Age: 21–70 years', 'Income-based repayment capacity', 'Property legal compliance'],
      documents: ['Identity and address proof', 'Income documents', 'Property papers'],
      benefits: ['Long tenure up to 30 years', 'Tax benefits as per rules', 'Low EMI options'],
    },
  },
  {
    key: 'education',
    title: 'Education Loan',
    icon: FiBookOpen,
    description: 'Support higher education in India and abroad with easy repayment options.',
    highlights: 'Starting from 9.25% p.a. • Up to ₹75L',
    details: {
      explanation: 'Education loans help students cover tuition, hostel, travel, and related academic costs.',
      eligibility: ['Confirmed admission offer', 'Co-applicant profile', 'Course/institute eligibility'],
      documents: ['Admission letter', 'KYC and income docs of co-applicant', 'Academic records'],
      benefits: ['Moratorium period', 'Student-focused products', 'Covers multiple academic expenses'],
    },
  },
  {
    key: 'vehicle',
    title: 'Vehicle Loan',
    icon: FiTruck,
    description: 'Finance for new or used cars and two-wheelers with quick approvals.',
    highlights: 'Starting from 9.75% p.a. • Up to ₹75L',
    details: {
      explanation: 'Vehicle loans make car and two-wheeler purchases affordable with structured EMIs.',
      eligibility: ['Age: 21–65 years', 'Income proof', 'Basic credit eligibility'],
      documents: ['KYC documents', 'Income proof', 'Vehicle quotation'],
      benefits: ['Fast processing', 'Attractive rates', 'Flexible EMI tenure'],
    },
  },
  {
    key: 'credit-card',
    title: 'Credit Cards',
    icon: FiCreditCard,
    description: 'Choose reward, travel, and cashback cards matched to your profile.',
    highlights: 'Instant checks • Reward-focused offers',
    details: {
      explanation: 'Credit cards provide revolving credit with benefits like cashback, points, and offers.',
      eligibility: ['Age: 21+ years', 'Stable income', 'Credit policy fit'],
      documents: ['KYC documents', 'Income proof', 'Employment details'],
      benefits: ['Rewards and cashback', 'Instant digital card options', 'Easy EMI conversion'],
    },
  },
];

const whyChooseUs = [
  { title: 'Fast Approval', icon: FiZap, text: 'Real-time eligibility and quick processing across top lenders.' },
  { title: 'Low Interest Rates', icon: FiPercent, text: 'Compare multiple offers and choose the most competitive rate.' },
  { title: 'Secure Process', icon: FiShield, text: 'Bank-grade security and transparent document handling.' },
  { title: 'Trusted Partners', icon: FiUsers, text: '50+ leading banks and NBFCs in one unified platform.' },
];

const steps = [
  { title: 'Check Eligibility', desc: 'Get instant eligibility check in minutes.' },
  { title: 'Compare Offers', desc: 'Review lender options and choose the best fit.' },
  { title: 'Submit Documents', desc: 'Upload required documents securely online.' },
  { title: 'Get Disbursal', desc: 'Receive approval and quick disbursal.' },
];

export default function Services() {
  const [expandedService, setExpandedService] = useState('personal');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-700 text-slate-900 dark:text-white"
            >
              Our Financial Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Smart, fast, and reliable financial solutions tailored for you
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <Link to="/apply" className="btn-primary px-8 py-3 rounded-none inline-flex items-center gap-2">
                Apply Now <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">Explore All Services</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="card hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-none bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-700 text-slate-900 dark:text-white">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{service.description}</p>
                    <p className="mt-3 text-sm font-600 text-blue-600 dark:text-blue-400">{service.highlights}</p>
                    <div className="mt-5">
                      <Link to="/apply" className="btn-primary px-5 py-2.5 rounded-none inline-flex items-center gap-2 text-sm">
                        Apply Now
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Service Sections */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">Service Details</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">Eligibility, required documents, and key benefits for each product.</p>
            </div>

            <div className="space-y-4">
              {services.map((service) => {
                const isOpen = expandedService === service.key;
                return (
                  <article key={service.key} className="card p-0 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedService(isOpen ? '' : service.key)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <div>
                        <h3 className="text-lg font-700 text-slate-900 dark:text-white">{service.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{service.details.explanation}</p>
                      </div>
                      <FiChevronDown className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-slate-200 dark:border-slate-700"
                        >
                          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-700 text-slate-900 dark:text-white mb-3">Eligibility</h4>
                              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                {service.details.eligibility.map((item) => (
                                  <li key={item} className="flex items-start gap-2">
                                    <FiCheck className="text-blue-600 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-700 text-slate-900 dark:text-white mb-3">Required Documents</h4>
                              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                {service.details.documents.map((item) => (
                                  <li key={item} className="flex items-start gap-2">
                                    <FiCheck className="text-blue-600 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-700 text-slate-900 dark:text-white mb-3">Key Benefits</h4>
                              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                {service.details.benefits.map((item) => (
                                  <li key={item} className="flex items-start gap-2">
                                    <FiCheck className="text-blue-600 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card"
                >
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-none flex items-center justify-center text-sm font-700">{i + 1}</div>
                  <h3 className="mt-4 text-lg font-700 text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">Why Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="card"
                  >
                    <div className="w-12 h-12 rounded-none bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-700 text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center card">
            <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">Get Started with Your Loan Today</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Apply in minutes and get matched with the right lender.</p>
            <div className="mt-8">
              <Link to="/apply" className="btn-primary px-8 py-3 rounded-none inline-flex items-center gap-2">
                Apply Now <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
