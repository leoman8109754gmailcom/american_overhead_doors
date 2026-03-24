import { useState, useEffect, useRef, useCallback } from 'react';
import serviceImg from './assets/service img.webp';

const NAV_H = 60;
const services = [
  { number: '1', title: 'COMERCIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '2', title: 'RESIDENTIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '3', title: 'INDUSTRIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '4', title: 'EMERGENCY', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
];

const dur = '0.6s';

function Services() {
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const darkRefs = useRef([]);
  const tintRefs = useRef([]);
  const labelRefs = useRef([]);
  const contentRefs = useRef([]);
  const rafRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const updatePanels = useCallback(() => {
    if (!sectionRef.current) return;
    const { top } = sectionRef.current.getBoundingClientRect();
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const progress = Math.min(Math.max(0, -top) / scrollable, 1) * (services.length - 1);

    for (let i = 0; i < services.length; i++) {
      const openness = Math.max(0, 1 - Math.abs(progress - i));
      const panel = panelRefs.current[i];
      if (!panel) continue;

      panel.style.flexGrow = 1 + openness * 7;
      if (darkRefs.current[i]) darkRefs.current[i].style.opacity = 1 - openness;
      if (tintRefs.current[i]) tintRefs.current[i].style.opacity = openness;
      if (labelRefs.current[i]) labelRefs.current[i].style.opacity = 1 - openness;
      if (contentRefs.current[i]) contentRefs.current[i].style.opacity = openness;
    }
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePanels);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    updatePanels();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, updatePanels]);

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <section
        id="services"
        ref={sectionRef}
        style={{ height: `${services.length * 80}vh` }}
      >
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

          <div className="flex flex-col flex-1 overflow-hidden" style={{ height: 'calc(100% - 60px)' }}>
            {services.map((s, i) => (
              <div
                key={i}
                ref={el => panelRefs.current[i] = el}
                className="relative overflow-hidden border-b border-gray-600 last:border-b-0"
                style={{
                  flex: i === 0 ? 8 : 1,
                  backgroundColor: '#0a1628',
                  transition: 'flex-grow 60ms linear, opacity 60ms linear',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${serviceImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div ref={el => darkRefs.current[i] = el} className="absolute inset-0" style={{ backgroundColor: '#0a1628', opacity: i === 0 ? 0 : 1 }} />
                <div ref={el => tintRefs.current[i] = el} className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.30)', opacity: i === 0 ? 1 : 0 }} />

                <span
                  className="absolute z-10"
                  style={{
                    fontFamily: "'Karantina', cursive",
                    fontSize: '1.2rem',
                    fontStyle: 'italic',
                    color: '#c1272d',
                    top: '50%',
                    left: '0.5rem',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {s.number}
                </span>

                <span
                  ref={el => labelRefs.current[i] = el}
                  className="absolute z-10 pointer-events-none"
                  style={{
                    fontFamily: "'Impact','Arial Black',sans-serif",
                    fontSize: '0.85rem',
                    letterSpacing: '0.15em',
                    color: '#fff',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-30%,-50%)',
                    opacity: i === 0 ? 0 : 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.title}
                </span>

                <div
                  ref={el => contentRefs.current[i] = el}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
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