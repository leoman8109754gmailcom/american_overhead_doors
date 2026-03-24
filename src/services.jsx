import { useState, useEffect, useRef } from 'react';
import serviceImg from './assets/service img.webp';

const NAV_H = 60;
const services = [
  { number: '1', title: 'COMERCIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '2', title: 'RESIDENTIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '3', title: 'INDUSTRIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '4', title: 'EMERGENCY', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
];

const dur = '0.6s';
const TOTAL = services.length;

/* Build CSS keyframes for each panel's fade in/out based on scroll position */
function buildMobileCSS() {
  let css = '';
  for (let i = 0; i < TOTAL; i++) {
    const start = (i / TOTAL) * 100;
    const peak = ((i + 0.5) / TOTAL) * 100;
    const end = ((i + 1) / TOTAL) * 100;

    css += `
      @keyframes panel-${i} {
        0%      { opacity: ${i === 0 ? 1 : 0}; }
        ${Math.max(start - 1, 0)}% { opacity: 0; }
        ${peak}% { opacity: 1; }
        ${Math.min(end + 1, 100)}% { opacity: 0; }
        100%    { opacity: ${i === TOTAL - 1 ? 1 : 0}; }
      }
      .mobile-panel-${i} {
        animation: panel-${i} linear both;
        animation-timeline: scroll(nearest);
        animation-range: 0% 100%;
      }
    `;
  }
  return css;
}

function Services() {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── MOBILE ── pure CSS scroll-driven animation, no JS on scroll ── */
  if (isMobile) {
    return (
      <section id="services" ref={sectionRef}>
        <style>{buildMobileCSS()}</style>

        {/* Scrollable container that drives the animation timeline */}
        <div
          style={{
            position: 'sticky',
            top: `${NAV_H}px`,
            height: `calc(100vh - ${NAV_H}px)`,
            overflow: 'hidden',
          }}
        >
          <div className="text-center pt-4 pb-2 bg-white relative z-20">
            <h2
              className="font-black tracking-wider text-4xl"
              style={{ fontFamily: "'Karantina', cursive", color: '#0a1628' }}
            >
              SERVICES
            </h2>
          </div>

          {/* Scroll driver — this hidden scrollable div powers the animation */}
          <div
            className="relative"
            style={{
              height: 'calc(100% - 60px)',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Spacer to create scroll distance */}
            <div style={{ height: `${TOTAL * 100}%`, position: 'relative' }}>
              {/* Stacked panels pinned to viewport */}
              <div className="sticky top-0" style={{ height: `calc(100vh - ${NAV_H + 60}px)` }}>
                {services.map((s, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 mobile-panel-${i}`}
                    style={{ willChange: 'opacity' }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${serviceImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.30)' }} />

                    <span
                      className="absolute z-10"
                      style={{
                        fontFamily: "'Karantina', cursive",
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        color: '#c1272d',
                        top: '1rem',
                        left: '1rem',
                      }}
                    >
                      {s.number}
                    </span>

                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                      <h3
                        className="font-black tracking-wider text-2xl mb-4"
                        style={{ fontFamily: "'Alexandria', sans-serif", color: '#0a1628' }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-center leading-relaxed italic max-w-md text-sm"
                        style={{ color: '#1a2a40', fontFamily: "'Alexandria', sans-serif" }}
                      >
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP ── */
  return (
    <section id="services" ref={sectionRef}>
      <div className="text-right pr-12 pt-8 pb-4">
        <h2
          className="font-black tracking-wider text-5xl"
          style={{ fontFamily: "'Karantina', cursive", color: '#0a1628' }}
        >
          SERVICES
        </h2>
      </div>

      <div
        className="flex"
        style={{ height: '750px' }}
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        {services.map((s, i) => {
          const open = hoveredIndex === i;
          return (
            <div
              key={i}
              className="relative overflow-hidden cursor-pointer border-r border-gray-600 last:border-r-0"
              style={{
                flex: open ? 5 : 1,
                backgroundColor: '#0a1628',
                transition: `flex ${dur} cubic-bezier(0.4,0,0.2,1)`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              <img src={serviceImg} alt="" className="absolute inset-0 w-full h-full object-cover" />

              <div className="absolute inset-0" style={{ backgroundColor: '#0a1628', opacity: open ? 0 : 1, transition: `opacity ${dur} ease` }} />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.30)', opacity: open ? 1 : 0, transition: `opacity ${dur} ease` }} />

              <span
                className="absolute z-10"
                style={{
                  fontFamily: "'Karantina', cursive",
                  fontSize: '4rem',
                  fontStyle: 'italic',
                  color: '#c1272d',
                  top: '0.75rem',
                  left: '1rem',
                }}
              >
                {s.number}
              </span>

              <span
                className="absolute z-10 pointer-events-none"
                style={{
                  fontFamily: "'Impact','Arial Black',sans-serif",
                  fontSize: '1.75rem',
                  letterSpacing: '0.15em',
                  color: '#fff',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%) rotate(180deg)',
                  opacity: open ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.title}
              </span>

              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-10"
                style={{
                  opacity: open ? 1 : 0,
                  transition: open ? `opacity 0.5s ease 0.2s` : 'opacity 0.3s ease',
                }}
              >
                <h3
                  className="font-black tracking-wider text-3xl mb-6"
                  style={{ fontFamily: "'Alexandria', sans-serif", color: '#0a1628' }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-center leading-relaxed italic max-w-md text-base"
                  style={{ color: '#1a2a40', fontFamily: "'Alexandria', sans-serif" }}
                >
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;