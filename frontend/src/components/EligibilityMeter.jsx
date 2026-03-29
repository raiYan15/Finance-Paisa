import { motion } from 'framer-motion';

export default function EligibilityMeter({ score }) {
  const getColor = (s) => {
    if (s >= 80) return { text: 'text-emerald-400', bg: 'from-emerald-400 to-teal-400', label: 'Excellent', desc: 'High chance of approval' };
    if (s >= 60) return { text: 'text-blue-400', bg: 'from-blue-400 to-cyan-400', label: 'Good', desc: 'Good chance of approval' };
    if (s >= 40) return { text: 'text-amber-400', bg: 'from-amber-400 to-orange-400', label: 'Fair', desc: 'Moderate chance of approval' };
    return { text: 'text-red-400', bg: 'from-red-400 to-rose-400', label: 'Low', desc: 'May need improvement' };
  };
  const config = getColor(score);

  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl p-5 border border-gray-100 dark:border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Eligibility Score</h4>
        <div className={`text-2xl font-bold ${config.text}`}>{score}<span className="text-sm font-normal text-gray-400">/100</span></div>
      </div>
      <div className="w-full h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r ${config.bg}`}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${config.text}`}>{config.label}</span>
        <span className="text-xs text-gray-500">{config.desc}</span>
      </div>
    </div>
  );
}
