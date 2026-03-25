import logo from './assets/Logo 3.svg';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#CDB895',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {/* Logo */}
      <div style={{ flexShrink: 0 }}>
        <img
          src={logo}
          alt="American Overhead Doors Logo"
          style={{ height: '3rem', width: 'auto' }}
        />
      </div>

      {/* Copyright */}
      <div style={{ textAlign: 'center', flex: '1 1 auto' }}>
        <p
          style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#002F49',
            fontWeight: 700,
            fontSize: 'clamp(0.75rem, 2vw, 1.1rem)',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          &copy; {new Date().getFullYear()} American Overhead Doors Inc.
        </p>
        <p
          style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#002F49',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.95rem)',
            margin: '0.15rem 0 0 0',
          }}
        >
          All rights reserved.
        </p>
      </div>

      {/* Contact + CMS link */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <p
          style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#002F49',
            fontWeight: 700,
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            margin: 0,
          }}
        >
          P: (000)-000-0000
        </p>
        <p
          style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#002F49',
            fontWeight: 700,
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            margin: '0.15rem 0 0 0',
          }}
        >
          E: example@email.com
        </p>
        <a
          href="https://american-ovh-doors.sanity.studio/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'Alexandria, sans-serif',
            color: '#D8263E',
            fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            marginTop: '0.35rem',
            display: 'inline-block',
            textDecoration: 'underline',
          }}
        >
          Manage Content (CMS)
        </a>
      </div>
    </footer>
  );
}
