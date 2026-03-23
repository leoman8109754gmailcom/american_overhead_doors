import logo from './assets/Logo 3.svg';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 250);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (isMobile) {
        setNavHidden(currentY > lastScrollY && currentY > 80);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, lastScrollY]);

  return (
    <nav style={{ backgroundColor: 'transparent', width: '100%', boxSizing: 'border-box', position: 'sticky', top: 0, zIndex: 1000, transform: navHidden && isMobile ? 'translateY(-100%)' : 'translateY(0)', transition: 'transform 0.3s ease' }}>
      {/* Main bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: scrolled && !isMobile ? '0.1rem 2.5rem' : '0.4rem 2.5rem', boxSizing: 'border-box', backgroundColor: '#C9A87C', transition: 'padding 0.3s ease' }}>

        {/* Logo */}
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="American Overhead Doors Logo" style={{ height: scrolled && !isMobile ? '2rem' : '3.5rem', width: 'auto', transition: 'height 0.3s ease' }} />
        </a>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
            <a href="#about" style={{ color: '#002F49', fontFamily: 'Alexandria, sans-serif', fontWeight: 'bold', fontSize: '1.125rem', textDecoration: 'none', letterSpacing: '0.05em' }}>About Us</a>
            <a href="#services" style={{ color: '#002F49', fontFamily: 'Alexandria, sans-serif', fontWeight: 'bold', fontSize: '1.125rem', textDecoration: 'none', letterSpacing: '0.05em' }}>Services</a>
            <a href="#work" style={{ color: '#002F49', fontFamily: 'Alexandria, sans-serif', fontWeight: 'bold', fontSize: '1.125rem', textDecoration: 'none', letterSpacing: '0.05em' }}>Our Work</a>
          </div>
        )}

        {/* Desktop Contact Button */}
        {!isMobile && (
          <a
            href="#contact"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setClicked(false); }}
            onMouseDown={() => setClicked(true)}
            onMouseUp={() => setClicked(false)}
            style={{
              backgroundColor: '#002F49',
              color: '#D8263E',
              fontFamily: 'Karantina, cursive',
              padding: scrolled ? '0.5rem 1.5rem' : '1rem 2rem',
              fontSize: scrolled ? '1.25rem' : '1.875rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              display: 'inline-block',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              opacity: clicked ? 0.6 : 1,
              transition: 'transform 0.15s ease, opacity 0.1s ease, padding 0.3s ease, font-size 0.3s ease',
            }}
          >
            Contact
          </a>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={() => { menuOpen ? closeMenu() : setMenuOpen(true); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: '28px', height: '3px', backgroundColor: '#002F49', borderRadius: '2px', transition: 'all 0.3s ease', transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '28px', height: '3px', backgroundColor: '#002F49', borderRadius: '2px', transition: 'all 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '28px', height: '3px', backgroundColor: '#002F49', borderRadius: '2px', transition: 'all 0.3s ease', transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && menuOpen && (
        <div className={menuClosing ? 'mobile-menu-closing' : 'mobile-menu'} style={{ position: 'absolute', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 2rem', backgroundColor: 'rgba(201, 168, 124, 0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '0 0 1.5rem 1.5rem', overflow: 'hidden', zIndex: 999 }}>
          <a href="#about" onClick={closeMenu} style={{ color: '#002F49', fontFamily: 'Alexandria, sans-serif', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none', letterSpacing: '0.05em' }}>About Us</a>
          <a href="#services" onClick={closeMenu} style={{ color: '#002F49', fontFamily: 'Alexandria, sans-serif', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none', letterSpacing: '0.05em' }}>Services</a>
          <a href="#work" onClick={closeMenu} style={{ color: '#002F49', fontFamily: 'Alexandria, sans-serif', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none', letterSpacing: '0.05em' }}>Our Work</a>
          <a
            href="#contact"
            onClick={closeMenu}
            style={{
              backgroundColor: '#002F49',
              color: '#D8263E',
              fontFamily: 'Karantina, cursive',
              padding: '0.75rem 2.5rem',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              display: 'inline-block',
              letterSpacing: '0.05em',
            }}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
