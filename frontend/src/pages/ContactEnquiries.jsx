import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contactAPI } from '../services/api';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const quickFAQs = [
  {
    q: 'How quickly can I get loan approval?',
    a: 'Most eligible applications receive a decision within minutes, subject to document verification.',
  },
  {
    q: 'Can I apply for multiple loan types?',
    a: 'Yes, you can apply for different loan categories based on your eligibility.',
  },
  {
    q: 'How can I track my application status?',
    a: 'You can track progress from your dashboard after logging in.',
  },
  {
    q: 'Do you charge hidden fees?',
    a: 'No. We maintain transparent pricing and loan terms.',
  },
];

export default function ContactEnquiries() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: 'Loan Enquiry',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const { data } = await contactAPI.create(values);
      if (data?.success) {
        toast.success('Your message has been sent successfully.');
        reset();
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to send message. Please try again.';
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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              We’re here to help you with your financial needs
            </motion.p>
          </div>
        </section>

        {/* FORM + DETAILS */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
              <h2 className="text-2xl font-700 text-slate-900 dark:text-white">Send an Enquiry</h2>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Full Name *</label>
                <input className="input-field" {...register('fullName', { required: 'Full Name is required' })} placeholder="Your full name" />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Email *</label>
                  <input
                    type="email"
                    className="input-field"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                    })}
                    placeholder="your@email.com"
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
              </div>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Subject *</label>
                <select className="input-field" {...register('subject', { required: true })}>
                  <option value="Loan Enquiry">Loan Enquiry</option>
                  <option value="Support">Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-500 text-slate-700 dark:text-slate-300 block mb-2">Message *</label>
                <textarea
                  rows={6}
                  className="input-field"
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Tell us how we can help you"
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary px-8 py-3 rounded-none inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : <><FiSend /> Send Message</>}
              </button>
            </form>

            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-700 text-slate-900 dark:text-white mb-5">Contact Details</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center"><FiMapPin /></div>
                    <div>
                      <p className="font-600 text-slate-900 dark:text-white">Address</p>
                      <p className="text-slate-600 dark:text-slate-400">FinancePaise, Ranchi, Jharkhand, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center"><FiPhone /></div>
                    <div>
                      <p className="font-600 text-slate-900 dark:text-white">Phone Number</p>
                      <p className="text-slate-600 dark:text-slate-400">7909064939</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center"><FiMail /></div>
                    <div>
                      <p className="font-600 text-slate-900 dark:text-white">Email</p>
                      <p className="text-slate-600 dark:text-slate-400">financepaise.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center"><FiClock /></div>
                    <div>
                      <p className="font-600 text-slate-900 dark:text-white">Working Hours</p>
                      <p className="text-slate-600 dark:text-slate-400">Mon-Sat, 9:00 AM - 7:00 PM (Online - Available anytime)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-700 text-slate-900 dark:text-white mb-4">Quick Help</h3>
                <div className="space-y-4">
                  {quickFAQs.map((faq) => (
                    <div key={faq.q} className="border border-slate-200 dark:border-slate-700 p-4 rounded-none">
                      <p className="font-600 text-slate-900 dark:text-white">{faq.q}</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card p-0 overflow-hidden">
              <iframe
                title="FinancePaisa Location"
                src="https://www.google.com/maps?q=Ranchi%20Jharkhand%20India&output=embed"
                className="w-full h-[360px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
