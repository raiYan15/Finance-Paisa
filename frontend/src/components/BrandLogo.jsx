import headerLogo from '../assets/logos/header-logo.jpg';
import footerLogo from '../assets/logos/footer-logo.jpg';

export default function BrandLogo({ size = 'md', className = '', variant = 'header' }) {
  const sizeClass = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  }[size] || 'h-10';

  const logoSrc = variant === 'footer' ? footerLogo : headerLogo;
  const logoAlt = variant === 'footer' ? 'Finance Paisa' : 'Finance Paisa logo';

  return (
    <img
      src={logoSrc}
      alt={logoAlt}
      className={`${sizeClass} w-auto object-contain ${className}`.trim()}
      draggable={false}
    />
  );
}
