import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

export default function Signup() {
  const [step, setStep] = useState('register'); // 'register' | 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const { register: registerUser, verifyOtp, resendOtp, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onRegister = async (data) => {
    const result = await registerUser(data);
    if (result?.success) {
      setOtpEmail(data.email);
      setDevOtp(result.devOtp || '');
      setStep('otp');
    }
  };

  const onVerifyOtp = async () => {
    if (otpValue.length !== 6) return;
    const result = await verifyOtp(otpEmail, otpValue);
    if (result?.success) navigate('/dashboard');
  };

  const onResendOtp = async () => {
    const result = await resendOtp(otpEmail);
    if (result?.success && result?.devOtp) {
      setDevOtp(result.devOtp);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-none bg-blue-600 flex items-center justify-center">
            <RiMoneyDollarCircleLine className="text-white text-xl" />
          </div>
          <span className="text-2xl font-700 text-slate-900 dark:text-white">Finance <span className="text-blue-600 dark:text-blue-400">Paisa</span></span>
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-none p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
          <AnimatePresence mode="wait">
            {step === 'register' ? (
              <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-700 text-slate-900 dark:text-white mb-2">Create Account</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Join 15 lakh+ Indians on Finance Paisa</p>
                </div>
                <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
                  <div>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })} placeholder="Full Name" className="input-field pl-10" />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} placeholder="Email Address" type="email" className="input-field pl-10" />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('phone', { required: 'Phone is required', pattern: { value: /^[6-9]\d{9}$/, message: '10-digit Indian phone number' } })} placeholder="Phone Number" type="tel" className="input-field pl-10" />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })} type={showPassword ? 'text' : 'password'} placeholder="Create Password" className="input-field pl-10 pr-10" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                  </div>
                  <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }} className="btn-primary w-full py-3.5 rounded-none flex items-center justify-center gap-2 text-base font-600 disabled:opacity-60">
                    {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</> : <>Create Account <FiArrowRight /></>}
                  </motion.button>
                </form>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                  Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-600 hover:text-blue-700 dark:hover:text-blue-300">Sign In</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-none bg-blue-600 flex items-center justify-center mx-auto mb-4">
                    <FiShield className="text-white text-2xl" />
                  </div>
                  <h1 className="text-2xl font-700 text-slate-900 dark:text-white mb-2">Verify OTP</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Enter the 6-digit OTP sent to</p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-600">{otpEmail}</p>
                  {devOtp && (
                    <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2 text-xs text-emerald-400">
                      <strong>Dev Mode OTP:</strong> {devOtp}
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={e => setOtpValue(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="input-field text-center text-2xl tracking-[0.5em] font-bold w-48"
                    />
                  </div>
                  <motion.button onClick={onVerifyOtp} disabled={loading || otpValue.length !== 6} whileTap={{ scale: 0.98 }} className="btn-primary w-full py-3.5 rounded-none flex items-center justify-center gap-2 text-base font-600 disabled:opacity-60">
                    {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying...</> : <>Verify & Continue <FiArrowRight /></>}
                  </motion.button>
                  <button onClick={onResendOtp} disabled={loading} className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1 disabled:opacity-60">
                    Resend OTP
                  </button>
                  <button onClick={() => setStep('register')} className="w-full text-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 py-2">← Back to registration</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
