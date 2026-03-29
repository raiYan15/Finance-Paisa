import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  { q: 'How quickly can I get my loan disbursed?', a: 'With Finance Paisa, most personal loans are disbursed within 24-48 hours after document verification. Home loans may take 7-10 business days due to property verification.' },
  { q: 'What documents are required for a personal loan?', a: 'You need: PAN Card, Aadhaar Card, last 3 months salary slips, bank statements, and a passport-size photograph. Self-employed individuals need ITR/business proof additionally.' },
  { q: 'Will applying affect my CIBIL score?', a: 'No, checking your eligibility on Finance Paisa does a soft inquiry which does not affect your credit score. Only when you formally apply does a hard inquiry happen.' },
  { q: 'Can I apply for a loan if I have existing EMIs?', a: 'Yes! You can still qualify if your total EMI obligations (including the new loan) do not exceed 50% of your monthly income. Our system calculates this automatically.' },
  { q: 'What is the minimum credit score required?', a: 'Different lenders have different thresholds. Generally a CIBIL score of 700+ is preferred for personal loans, but we have lender partners who can assist with scores as low as 650.' },
  { q: 'Are there any hidden charges?', a: 'No hidden charges! Finance Paisa is completely transparent. Processing fee, prepayment charges, and all other fees are clearly shown before you apply.' },
  { q: 'How secure is my personal data?', a: 'We use 256-bit SSL encryption and follow RBI data security guidelines. Your data is never shared without consent and is used only for loan processing.' },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="rounded-none border border-gray-200 dark:border-slate-700 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-colors duration-200"
          >
            <span className="text-sm font-600 text-gray-900 dark:text-white pr-4 font-500">{faq.q}</span>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <FiChevronDown className={`text-lg shrink-0 ${openIndex === i ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-white dark:bg-slate-800 font-400">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
