import heroImg from './assets/hero_img.webp';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <section style={{ backgroundColor: '#FFFFFF', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        {/* Image on top */}
        <img
          src={heroImg}
          alt="American Overhead Doors"
          style={{ width: '100%', maxWidth: '420px', borderRadius: '0.5rem', objectFit: 'cover' }}
        />

        {/* Title */}
        <h1 style={{
          fontFamily: 'Karantina, cursive',
          color: '#D8263E',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          textAlign: 'center',
          lineHeight: 1.1,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          American Overhead Doors
        </h1>

        {/* Body text */}
        <p style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#1a1a1a',
          fontSize: '1rem',
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '380px',
          margin: 0,
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat,
          elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor
          auctor. Donec quis convallis lacus.
        </p>

        {/* Services button */}
        <a
          href="#services"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setClicked(false); }}
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          style={{
            backgroundColor: '#002F49',
            color: '#D8263E',
            fontFamily: 'Alexandria, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            padding: '0.75rem 2.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'inline-block',
            marginTop: '0.5rem',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            opacity: clicked ? 0.6 : 1,
            transition: 'transform 0.15s ease, opacity 0.1s ease',
          }}
        >
          Services
        </a>
      </section>
    );
  }

  // Desktop layout
  return (
    <section style={{
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '5rem 8rem',
      gap: '4rem',
      minHeight: 'calc(100vh - 72px)',
    }}>
      {/* Left: Text content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '560px' }}>
        <h1 style={{
          fontFamily: 'Karantina, cursive',
          color: '#D8263E',
          fontWeight: 'bold',
          fontSize: '5rem',
          textAlign: 'center',
          lineHeight: 1.05,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          American Overhead Doors
        </h1>

        <p style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#1a1a1a',
          fontSize: '1.15rem',
          textAlign: 'center',
          lineHeight: 1.8,
          margin: 0,
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat,
          elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor
          auctor. Donec quis convallis lacus.
        </p>

        <a
          href="#services"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setClicked(false); }}
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          style={{
            backgroundColor: '#002F49',
            color: '#D8263E',
            fontFamily: 'Alexandria, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            padding: '1rem 3.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'inline-block',
            marginTop: '1.5rem',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            opacity: clicked ? 0.6 : 1,
            transition: 'transform 0.15s ease, opacity 0.1s ease',
          }}
        >
          Services
        </a>
      </div>

      {/* Right: Image */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <img
          src={heroImg}
          alt="American Overhead Doors"
          style={{ width: '100%', borderRadius: '0.5rem', objectFit: 'cover', maxHeight: '520px' }}
        />
      </div>
    </section>
  );
}
