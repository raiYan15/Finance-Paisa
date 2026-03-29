import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import EligibilityMeter from '../components/EligibilityMeter';
import { loanAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const steps = ['Personal Details', 'Employment', 'Income & Bank', 'Loan Requirements'];

const LOAN_TYPES = ['personal', 'business', 'home', 'education', 'vehicle', 'creditCard'];

export default function LoanApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [eligScore, setEligScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues, trigger, watch } = useForm({ defaultValues: { personalDetails: { fullName: user?.name, email: user?.email, phone: user?.phone }, loanRequirements: { loanType: 'personal' } } });

  const income = watch('incomeDetails.monthlyIncome') || 0;
  const emi = watch('incomeDetails.existingEMI') || 0;
  const loanAmt = watch('loanRequirements.loanAmount') || 0;
  const empType = watch('employmentDetails.employmentType') || 'salaried';
  const workExp = watch('employmentDetails.workExperience') || 0;

  // Calculate score live
  const calcScore = () => {
    if (!income || !loanAmt) return null;
    let score = 0;
    const net = income - emi;
    const ratio = loanAmt / (net * 60);
    if (ratio < 0.3) score += 30; else if (ratio < 0.4) score += 22; else if (ratio < 0.5) score += 14; else score += 6;
    score += 10; // default credit score part
    const emp = { salaried: 20, business: 16, 'self-employed': 12, retired: 8, other: 5 };
    score += emp[empType] || 5;
    if (workExp >= 5) score += 10; else if (workExp >= 3) score += 7; else if (workExp >= 1) score += 4; else score += 1;
    if (income >= 100000) score += 10; else if (income >= 50000) score += 7; else if (income >= 30000) score += 4; else score += 2;
    return Math.min(score, 100);
  };

  const next = async () => {
    const stepFields = [
      ['personalDetails.fullName', 'personalDetails.email', 'personalDetails.phone', 'personalDetails.gender'],
      ['employmentDetails.employmentType', 'employmentDetails.companyName', 'employmentDetails.workExperience'],
      ['incomeDetails.monthlyIncome', 'incomeDetails.existingEMI'],
      ['loanRequirements.loanType', 'loanRequirements.loanAmount', 'loanRequirements.loanPurpose'],
    ];
    const valid = await trigger(stepFields[currentStep]);
    if (!valid) return;
    if (currentStep === 2) setEligScore(calcScore());
    setCurrentStep(s => s + 1);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        personalDetails: data.personalDetails,
        employmentDetails: data.employmentDetails,
        incomeDetails: data.incomeDetails,
        loanRequirements: data.loanRequirements,
      };
      const res = await loanAPI.apply(payload);
      if (res.data.success) {
        setSubmitted(true);
        toast.success('Application submitted successfully! 🎉');
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 rounded-none p-12 text-center max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="w-20 h-20 rounded-none bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-emerald-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-700 text-slate-900 dark:text-white mb-3">Application Submitted!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">Your loan application has been submitted successfully. Our team will review it and notify you within 24–48 hours.</p>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-none overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-gradient-primary" />
          </div>
          <p className="text-xs text-gray-500 mt-3">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 transition-colors duration-300">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Loan Application</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Complete the form to apply for your loan</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-none flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < currentStep ? 'bg-emerald-500 text-white' : i === currentStep ? 'bg-gradient-primary text-white shadow-glow' : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                }`}>
                  {i < currentStep ? <FiCheck /> : i + 1}
                </div>
                <span className={`hidden sm:block text-xs font-medium ${i === currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-none overflow-hidden">
            <motion.div
              animate={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-primary rounded-none"
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{steps[currentStep]}</span>
          </div>
        </div>

        {/* Real-time eligibility (step 3+) */}
        {currentStep >= 3 && eligScore !== null && (
          <div className="mb-6">
            <EligibilityMeter score={eligScore} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <AnimatePresence mode="wait">
              {/* Step 0: Personal Details */}
              {currentStep === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Personal Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Full Name *</label>
                      <input {...register('personalDetails.fullName', { required: 'Required' })} className="input-field" placeholder="As per PAN Card" />
                      {errors.personalDetails?.fullName && <p className="text-red-400 text-xs mt-1">{errors.personalDetails.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Email *</label>
                      <input {...register('personalDetails.email', { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} type="email" className="input-field" placeholder="your@email.com" />
                      {errors.personalDetails?.email && <p className="text-red-400 text-xs mt-1">{errors.personalDetails.email.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Phone *</label>
                      <input {...register('personalDetails.phone', { required: 'Required', pattern: { value: /^[6-9]\d{9}$/, message: 'Valid 10-digit phone' } })} type="tel" className="input-field" placeholder="10-digit mobile" />
                      {errors.personalDetails?.phone && <p className="text-red-400 text-xs mt-1">{errors.personalDetails.phone.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Gender *</label>
                      <select {...register('personalDetails.gender', { required: 'Required' })} className="input-field">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.personalDetails?.gender && <p className="text-red-400 text-xs mt-1">{errors.personalDetails.gender.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">PAN Card</label>
                      <input {...register('personalDetails.panCard')} className="input-field" placeholder="ABCDE1234F" maxLength={10} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">City</label>
                      <input {...register('personalDetails.address.city')} className="input-field" placeholder="Your city" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Employment */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Employment Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Employment Type *</label>
                      <select {...register('employmentDetails.employmentType', { required: 'Required' })} className="input-field">
                        <option value="">Select type</option>
                        <option value="salaried">Salaried</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="business">Business Owner</option>
                        <option value="retired">Retired</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.employmentDetails?.employmentType && <p className="text-red-400 text-xs mt-1">{errors.employmentDetails.employmentType.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Company / Employer Name *</label>
                      <input {...register('employmentDetails.companyName', { required: 'Required' })} className="input-field" placeholder="Company name" />
                      {errors.employmentDetails?.companyName && <p className="text-red-400 text-xs mt-1">{errors.employmentDetails.companyName.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Designation</label>
                      <input {...register('employmentDetails.designation')} className="input-field" placeholder="Your job title" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Total Work Experience (years) *</label>
                      <input {...register('employmentDetails.workExperience', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })} type="number" className="input-field" placeholder="e.g. 3" />
                      {errors.employmentDetails?.workExperience && <p className="text-red-400 text-xs mt-1">{errors.employmentDetails.workExperience.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Income */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Income & Bank Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Monthly Income (₹) *</label>
                      <input {...register('incomeDetails.monthlyIncome', { required: 'Required', min: { value: 10000, message: 'Min ₹10,000' } })} type="number" className="input-field" placeholder="e.g. 75000" />
                      {errors.incomeDetails?.monthlyIncome && <p className="text-red-400 text-xs mt-1">{errors.incomeDetails.monthlyIncome.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Existing EMI Obligations (₹)</label>
                      <input {...register('incomeDetails.existingEMI', { min: { value: 0, message: 'Must be ≥ 0' } })} type="number" defaultValue={0} className="input-field" placeholder="e.g. 0" />
                      {errors.incomeDetails?.existingEMI && <p className="text-red-400 text-xs mt-1">{errors.incomeDetails.existingEMI.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Bank Name</label>
                      <input {...register('incomeDetails.bankName')} className="input-field" placeholder="Your salary bank" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Other Income (₹/month)</label>
                      <input {...register('incomeDetails.otherIncome')} type="number" defaultValue={0} className="input-field" placeholder="e.g. 0" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Loan Requirements */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Loan Requirements</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Loan Type *</label>
                      <select {...register('loanRequirements.loanType', { required: 'Required' })} className="input-field">
                        {LOAN_TYPES.map(t => <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Loan Amount (₹) *</label>
                      <input {...register('loanRequirements.loanAmount', { required: 'Required', min: { value: 50000, message: 'Min ₹50,000' } })} type="number" className="input-field" placeholder="e.g. 500000" />
                      {errors.loanRequirements?.loanAmount && <p className="text-red-400 text-xs mt-1">{errors.loanRequirements.loanAmount.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Loan Purpose *</label>
                      <input {...register('loanRequirements.loanPurpose', { required: 'Required' })} className="input-field" placeholder="e.g. Home renovation" />
                      {errors.loanRequirements?.loanPurpose && <p className="text-red-400 text-xs mt-1">{errors.loanRequirements.loanPurpose.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Tenure (months)</label>
                      <select {...register('loanRequirements.tenureMonths')} className="input-field">
                        {[12,24,36,48,60,72,84].map(t => <option key={t} value={t}>{t} months ({(t/12).toFixed(0)} yr{t > 12 ? 's' : ''})</option>)}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 gap-4">
            <button type="button" onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-none border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <FiArrowLeft /> Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button type="button" onClick={next} className="btn-primary px-8 py-3 rounded-none flex items-center gap-2 text-sm font-600">
                Next Step <FiArrowRight />
              </button>
            ) : (
              <motion.button type="submit" disabled={submitting} whileTap={{ scale: 0.98 }} className="btn-primary px-8 py-3 rounded-none flex items-center gap-2 text-sm font-600 disabled:opacity-60">
                {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</> : <><FiCheck /> Submit Application</>}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
