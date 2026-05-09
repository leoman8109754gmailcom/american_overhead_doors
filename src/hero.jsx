import { useState, useEffect } from 'react';
import { urlFor } from './sanityClient';

export default function Hero({ heroData }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headline = heroData?.headline ?? 'American Overhead Doors';
  const bodyText = heroData?.bodyText ?? '';
  const ctaText = heroData?.ctaText ?? 'Services';
  const imgSrc = heroData?.image?.asset
    ? urlFor(heroData.image).auto('format').width(900).url()
    : null;
  const imgAlt = heroData?.image?.alt ?? 'American Overhead Doors';

  if (isMobile) {
    return (
      <section style={{ backgroundColor: '#FFFFFF', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        {imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt}
            style={{ width: '100%', maxWidth: '420px', borderRadius: '0.5rem', objectFit: 'cover' }}
          />
        )}

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
          {headline}
        </h1>

        <p style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#1a1a1a',
          fontSize: '1rem',
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '380px',
          margin: 0,
        }}>
          {bodyText}
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
          {ctaText}
        </a>
      </section>
    );
  }

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
          {headline}
        </h1>

        <p style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#1a1a1a',
          fontSize: '1.15rem',
          textAlign: 'center',
          lineHeight: 1.8,
          margin: 0,
        }}>
          {bodyText}
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
          {ctaText}
        </a>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt}
            style={{ width: '100%', borderRadius: '0.5rem', objectFit: 'cover', maxHeight: '520px' }}
          />
        )}
      </div>
    </section>
  );
}
