import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import BrandLogo from './BrandLogo';

const footerLinks = {
  'Products': ['Personal Loan', 'Business Loan', 'Home Loan', 'Education Loan', 'Credit Card', 'Vehicle Loan'],
  'Company': ['About Us', 'Blog', 'Careers', 'Press', 'Partners'],
  'Support': ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Grievance Redressal'],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-2xl">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Get the latest offers, loan updates, and financial tips delivered to your inbox.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-grow px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                Subscribe
                <FiArrowRight />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Link to="/" className="flex items-center mb-6">
                <BrandLogo size="lg" variant="footer" className="select-none" />
              </Link>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-sm max-w-sm font-400">
                India's fastest growing fintech platform offering instant loans from 50+ banks and NBFCs with transparent processes and competitive rates.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm mb-8">
                <a 
                  href="mailto:financepaise.org"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group font-500"
                >
                  <div className="w-10 h-10 rounded-none bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50 transition-colors duration-200">
                    <FiMail className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <span>financepaise.org</span>
                </a>
                <a 
                  href="tel:+917909064939"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group font-500"
                >
                  <div className="w-10 h-10 rounded-none bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-950/50 transition-colors duration-200">
                    <FiPhone className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <span>7909064939</span>
                </a>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-500">
                  <div className="w-10 h-10 rounded-none bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                    <FiMapPin className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <span>FinancePaise, Ranchi, Jharkhand, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { Icon: FiFacebook, href: '#', label: 'Facebook' },
                  { Icon: FiTwitter, href: '#', label: 'Twitter' },
                  { Icon: FiInstagram, href: '#', label: 'Instagram' },
                  { Icon: FiLinkedin, href: '#', label: 'LinkedIn' }
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ y: -2 }}
                    className="w-11 h-11 rounded-none bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                  >
                    <Icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links], idx) => (
              <motion.div 
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-slate-900 dark:text-white font-600 text-sm uppercase tracking-widest mb-6">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map(link => (
                    <li key={link}>
                      <a 
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-500 relative group"
                      >
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-none" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Finance Paisa. All rights reserved. Licensed NBFC.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <span className="text-slate-600 dark:text-slate-400">RBI Regulated</span>
            <span className="text-slate-600 dark:text-slate-400">🔒 SSL Secured</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-500">
              Privacy
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-500">
              Terms
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-500">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
