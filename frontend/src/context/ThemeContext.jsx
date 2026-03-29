import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('fp_theme') || 'system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const shouldUseDark = themeMode === 'system' ? media.matches : themeMode === 'dark';
      setIsDark(shouldUseDark);
      document.documentElement.classList.toggle('dark', shouldUseDark);
    };

    applyTheme();

    const handleSystemThemeChange = () => {
      if (themeMode === 'system') {
        applyTheme();
      }
    };

    media.addEventListener('change', handleSystemThemeChange);
    return () => media.removeEventListener('change', handleSystemThemeChange);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('fp_theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => {
      const currentlyDark = prev === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : prev === 'dark';
      return currentlyDark ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
