import { useState, useEffect } from 'react';
import { urlFor } from './sanityClient';

export default function AboutUs({ aboutData }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const subheading = aboutData?.subheading ?? '';
  const bodyText = aboutData?.bodyText ?? '';
  const imgSrc = aboutData?.image?.asset
    ? urlFor(aboutData.image).auto('format').width(800).url()
    : null;
  const imgAlt = aboutData?.image?.alt ?? '45 Years in Business';

  if (isMobile) {
    return (
      <section id="about" style={{ backgroundColor: '#C9A87C', padding: '2.5rem 1.75rem' }}>
        <h2 style={{
          fontFamily: 'Karantina, cursive',
          color: '#002F49',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          margin: '0 0 1.5rem 0',
        }}>
          Who We Are
        </h2>

        <h3 style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#1a1a1a',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          margin: '0 0 1rem 0',
          textAlign: 'center',
        }}>
          {subheading}
        </h3>

        <p style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#D8263E',
          fontSize: '1rem',
          lineHeight: 1.75,
          margin: '0 0 1.75rem 0',
          textAlign: 'center',
        }}>
          {bodyText}
        </p>

        {imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt}
            style={{ width: '100%', borderRadius: '0.5rem', objectFit: 'cover' }}
          />
        )}
      </section>
    );
  }

  return (
    <section id="about" style={{
      backgroundColor: '#C9A87C',
      padding: '3.5rem 15rem 3.5rem 4rem',
      minHeight: '75vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}>
      <h2 style={{
        fontFamily: 'Karantina, cursive',
        color: '#002F49',
        fontWeight: 'bold',
        fontSize: '2.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        margin: '0 0 2rem 0',
      }}>
        Who We Are
      </h2>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '250px', flexShrink: 0, marginLeft: '20%' }}>
          <h2 style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#1a1a1a',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            margin: '0 0 1rem 0',
            textAlign: 'center',
          }}>
            {subheading}
          </h2>
          <h2 style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#D8263E',
            fontSize: '1.06rem',
            fontWeight: 'bold',
            lineHeight: 1.6,
            textAlign: 'center',
            margin: 0,
          }}>
            {bodyText}
          </h2>
        </div>

        <div style={{ width: '40%', flexShrink: 0 }}>
          {imgSrc && (
            <img
              src={imgSrc}
              alt={imgAlt}
              style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', borderRadius: '0.5rem' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
