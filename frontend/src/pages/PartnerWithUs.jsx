import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { partnerAPI } from '../services/api';
import { FiTrendingUp, FiZap, FiHeadphones, FiLayers, FiArrowRight } from 'react-icons/fi';

const benefitCards = [
  {
    title: 'High Commissions',
    description: 'Earn strong payouts with transparent commission structures.',
    icon: FiTrendingUp,
  },
  {
    title: 'Fast Approvals',
    description: 'Quick processing enables better conversion and partner success.',
    icon: FiZap,
  },
  {
    title: 'Dedicated Support',
    description: 'Get a relationship manager and responsive partner support.',
    icon: FiHeadphones,
  },
  {
    title: 'Wide Loan Products',
    description: 'Offer personal, business, home, education and vehicle loans.',
    icon: FiLayers,
  },
];

const partnerLogos = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'LIC HFL'];

export default function PartnerWithUs() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      businessType: 'DSA',
      yearsOfExperience: '',
      city: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const payload = { ...values, yearsOfExperience: Number(values.yearsOfExperience) };
      const { data } = await partnerAPI.apply(payload);
      if (data?.success) {
        toast.success('Partnership request submitted successfully. We will contact you soon.');
        reset();
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to submit request. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="pt-24">
        {/* HERO */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-700 text-slate-900 dark:text-white"
            >
              Partner With FinancePaisa
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Grow your business by collaborating with us
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10"
            >
              <a href="#partner-form" className="btn-primary px-8 py-3 rounded-none inline-flex items-center gap-2">
                Become a Partner <FiArrowRight />
              </a>
            </motion.div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">Why Partner With Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefitCards.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="card"
                  >
                    <div className="w-12 h-12 rounded-none bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-700 text-slate-900 dark:text-white">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section id="partner-form" className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">Partner Request Form</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">Fill in your details and our partnerships team will connect with you.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Full Name *</label>
                <input
                  className="input-field"
                  {...register('fullName', { required: 'Full Name is required' })}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Company Name *</label>
                <input
                  className="input-field"
                  {...register('companyName', { required: 'Company Name is required' })}
                  placeholder="Your company"
                />
                {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
              </div>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Email *</label>
                <input
                  type="email"
                  className="input-field"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                  placeholder="name@company.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Phone Number *</label>
                <input
                  type="tel"
                  className="input-field"
                  {...register('phone', {
                    required: 'Phone Number is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit phone number' },
                  })}
                  placeholder="9876543210"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Business Type *</label>
                <select className="input-field" {...register('businessType', { required: true })}>
                  <option value="DSA">DSA</option>
                  <option value="Agent">Agent</option>
                  <option value="NBFC">NBFC</option>
                  <option value="Bank">Bank</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Years of Experience *</label>
                <input
                  type="number"
                  min="0"
                  className="input-field"
                  {...register('yearsOfExperience', {
                    required: 'Experience is required',
                    min: { value: 0, message: 'Experience cannot be negative' },
                  })}
                  placeholder="e.g. 5"
                />
                {errors.yearsOfExperience && <p className="text-xs text-red-500 mt-1">{errors.yearsOfExperience.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">City / Location *</label>
                <input
                  className="input-field"
                  {...register('city', { required: 'City / Location is required' })}
                  placeholder="Mumbai"
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Message / Additional Info</label>
                <textarea
                  rows={5}
                  className="input-field"
                  {...register('message')}
                  placeholder="Tell us more about your business and partnership goals"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary px-8 py-3 rounded-none inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* TRUST */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="card text-center">
                <p className="text-4xl font-700 text-blue-600 dark:text-blue-400">50+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Partners</p>
              </div>
              <div className="card text-center">
                <p className="text-4xl font-700 text-blue-600 dark:text-blue-400">₹8500Cr+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Disbursed</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {partnerLogos.map((name) => (
                <div key={name} className="card p-4 text-center text-sm font-600 text-slate-700 dark:text-slate-300">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center card">
            <h2 className="text-3xl md:text-4xl font-700 text-slate-900 dark:text-white">Start earning with us today</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Build a profitable partnership with FinancePaisa.</p>
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
