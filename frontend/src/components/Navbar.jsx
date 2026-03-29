import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { 
    setMenuOpen(false); 
  }, [location]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return false;

    const navOffset = 96;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    return true;
  };

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace('#', '');
    const timer = setTimeout(() => {
      scrollToSection(sectionId);
    }, 80);

    return () => clearTimeout(timer);
  }, [location.hash, location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/', type: 'route' },
    { label: 'Services', href: '/services', type: 'route' },
    { label: 'How It Works', href: '/#how-it-works', type: 'section', sectionId: 'how-it-works' },
    { label: 'Partner With Us', href: '/partner-with-us', type: 'route' },
    { label: 'Contact', href: '/contact', type: 'route' },
    { label: 'FAQ', href: '/#faq', type: 'section', sectionId: 'faq' },
  ];

  const isRouteActive = (href) => location.pathname === href;

  const isSectionActive = (sectionId) => (
    location.pathname === '/' && location.hash === `#${sectionId}`
  );

  const handleSectionNavigation = (sectionId) => {
    setMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    scrollToSection(sectionId);
    window.history.replaceState(null, '', `/#${sectionId}`);
  };

  const handleLogout = () => { 
    logout(); 
    navigate('/'); 
    setUserMenuOpen(false); 
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl shadow-lg border-b'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'color-mix(in srgb, var(--card-color) 85%, transparent)', borderColor: 'var(--border-color)' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.02 }}>
              <BrandLogo size="md" variant="header" className="select-none" />
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              link.type === 'route' ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-500 transition-colors duration-200 relative group text-sm ${
                    isRouteActive(link.href)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[3px] bg-blue-600 transition-all duration-300 rounded-none ${
                      isRouteActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleSectionNavigation(link.sectionId)}
                  className={`font-500 transition-colors duration-200 relative group text-sm ${
                    isSectionActive(link.sectionId)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 h-[3px] bg-blue-600 transition-all duration-300 rounded-none ${
                    isSectionActive(link.sectionId) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              )
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 rounded-none flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: 'var(--card-color)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
            >
              {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </motion.button>

            {!isAuthenticated && (
              <div className="hidden md:flex items-center gap-3">
                <Link 
                  to="/login"
                  className="px-6 py-2.5 font-600 rounded-none transition-colors duration-300 text-sm"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Login
                </Link>
                <Link 
                  to="/apply"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Apply Now
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-3">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-none transition-colors duration-300"
                    style={{ backgroundColor: 'var(--card-color)', border: '1px solid var(--border-color)' }}
                  >
                    <div className="w-8 h-8 rounded-none bg-blue-600 flex items-center justify-center text-xs font-600 text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white max-w-24 truncate text-sm">
                      {user?.name}
                    </span>
                  </motion.button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 rounded-none shadow-lg overflow-hidden"
                        style={{ backgroundColor: 'var(--card-color)', border: '1px solid var(--border-color)' }}
                      >
                        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Logged in as</p>
                          <p className="font-700" style={{ color: 'var(--text-primary)' }}>{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                            className="block px-4 py-3 transition-colors duration-200 text-sm font-500 rounded-none"
                            style={{ color: 'var(--text-primary)' }}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            {user?.role === 'admin' ? '⚙️ Admin Panel' : '📊 Dashboard'}
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors duration-200 text-sm font-medium"
                          >
                            🚪 Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-none flex items-center justify-center"
              style={{ backgroundColor: 'var(--card-color)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
            >
              {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-color)' }}
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map(link => (
                  link.type === 'route' ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`block px-4 py-3 rounded-none transition-colors duration-200 font-medium text-sm ${
                        isRouteActive(link.href)
                          ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleSectionNavigation(link.sectionId)}
                      className={`w-full text-left block px-4 py-3 rounded-none transition-colors duration-200 font-medium text-sm ${
                        isSectionActive(link.sectionId)
                          ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                ))}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-2 mt-2 space-y-2">
                  {!isAuthenticated ? (
                    <>
                      <Link 
                        to="/login"
                        className="block px-4 py-3 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200 font-medium text-sm"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/apply"
                        className="block px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-600 rounded-none text-center text-sm"
                      >
                        Apply Now
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                        className="block px-4 py-3 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200 font-medium text-sm"
                      >
                        {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors duration-200 font-medium text-sm"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
