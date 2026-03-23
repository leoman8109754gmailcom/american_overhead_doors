import aboutImg from './assets/about_us.webp';
import { useState, useEffect } from 'react';

export default function AboutUs() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <section id="about" style={{ backgroundColor: '#C9A87C', padding: '2.5rem 1.75rem' }}>
        {/* Title */}
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

        {/* Subheading */}
        <h3 style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#1a1a1a',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          margin: '0 0 1rem 0',
          textAlign: 'center',
        }}>
          45 Yrs In Business
        </h3>

        {/* Body */}
        <p style={{
          fontFamily: 'Alexandria, sans-serif',
          color: '#D8263E',
          fontSize: '1rem',
          lineHeight: 1.75,
          margin: '0 0 1.75rem 0',
          textAlign: 'center',
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat,
          elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor
          auctor. Donec quis convallis lacus. Sed a laoreet massa. Donec id massa a augue
          egestas posuere. Cras a sapien sed neque congue egestas in eget urna.
        </p>

        {/* Image */}
        <img
          src={aboutImg}
          alt="45 Years in Business"
          style={{ width: '100%', borderRadius: '0.5rem', objectFit: 'cover' }}
        />
      </section>
    );
  }

  // Desktop layout
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
      {/* Title — flush to section left padding */}
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

      {/* Two-column row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>

        {/* Left: text — very narrow, closer to center */}
        <div style={{ width: '250px', flexShrink: 0, marginLeft: '20%' }}>
          <h2 style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#1a1a1a',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            margin: '0 0 1rem 0',
            textAlign: 'center',
          }}>
            45 Yrs In Business
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat,
            elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor
            auctor. Donec quis convallis lacus. Sed a laoreet massa. Donec id massa a augue
            egestas posuere. Cras a sapien sed neque congue egestas in eget urna.
          </h2>
        </div>

        {/* Right: image — in the right half of the page */}
        <div style={{ width: '40%', flexShrink: 0 }}>
          <img
            src={aboutImg}
            alt="45 Years in Business"
            style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', borderRadius: '0.5rem' }}
          />
        </div>
      </div>
    </section>
  );
}
