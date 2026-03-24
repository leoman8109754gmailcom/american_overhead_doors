import { useState, useEffect, useRef, useCallback } from 'react';
import serviceImg from './assets/service img.webp';

const NAV_H = 60;
const services = [
  { number: '1', title: 'COMERCIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '2', title: 'RESIDENTIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '3', title: 'INDUSTRIAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
  { number: '4', title: 'EMERGENCY', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacus erat, elementum non viverra in, pellentesque et magna. Etiam scelerisque augue nec tempor auctor.' },
];

const dur = (mobile) => (mobile ? '0.7s' : '0.6s');

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

      // Batch all style writes together to avoid layout thrashing
      const s = panel.style;
      const ds = darkRefs.current[i]?.style;
      const ts = tintRefs.current[i]?.style;
      const ls = labelRefs.current[i]?.style;
      const cs = contentRefs.current[i]?.style;

      s.flexGrow = 1 + openness * 7;
      if (ds) ds.opacity = 1 - openness;
      if (ts) ts.opacity = openness;
      if (ls) ls.opacity = 1 - openness;
      if (cs) cs.opacity = openness;
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

  const d = dur(isMobile);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={isMobile ? { height: `${services.length * 70}vh` } : {}}
    >
      <div
        className={isMobile ? 'flex flex-col overflow-hidden' : ''}
        style={isMobile ? { position: 'sticky', top: `${NAV_H}px`, height: `calc(100vh - ${NAV_H}px)` } : {}}
      >
        <div className={isMobile ? 'text-center pt-4 pb-2 bg-white' : 'text-right pr-12 pt-8 pb-4'}>
          <h2
            className={`font-black tracking-wider ${isMobile ? 'text-4xl' : 'text-5xl'}`}
            style={{ fontFamily: "'Karantina', cursive", color: '#0a1628' }}
          >
            SERVICES
          </h2>
        </div>

        <div
          className={isMobile ? 'flex flex-col flex-1 overflow-hidden' : 'flex'}
          style={!isMobile ? { height: '750px' } : {}}
          onMouseLeave={!isMobile ? () => setHoveredIndex(-1) : undefined}
        >
          {services.map((s, i) => {
            const open = hoveredIndex === i;
            return (
              <div
                key={i}
                ref={el => panelRefs.current[i] = el}
                className={`relative overflow-hidden cursor-pointer ${
                  isMobile ? 'border-b border-gray-600 last:border-b-0' : 'border-r border-gray-600 last:border-r-0'
                }`}
                style={{
                  flex: isMobile ? 1 : (open ? 5 : 1),
                  backgroundColor: '#0a1628',
                  transition: isMobile ? 'none' : `flex ${d} cubic-bezier(0.4,0,0.2,1)`,
                  willChange: isMobile ? 'flex-grow, opacity' : undefined,
                  contain: isMobile ? 'layout style' : undefined,
                }}
                onMouseEnter={!isMobile ? () => setHoveredIndex(i) : undefined}
              >
                {!isMobile && <img src={serviceImg} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                {isMobile && <div className="absolute inset-0" style={{ backgroundImage: `url(${serviceImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}

                {/* Dark cover */}
                <div ref={el => darkRefs.current[i] = el} className="absolute inset-0" style={{ backgroundColor: '#0a1628', opacity: isMobile ? 1 : (open ? 0 : 1), transition: isMobile ? 'none' : `opacity ${d} ease` }} />

                {/* Light tint */}
                <div ref={el => tintRefs.current[i] = el} className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.30)', opacity: isMobile ? 0 : (open ? 1 : 0), transition: isMobile ? 'none' : `opacity ${d} ease` }} />

                {/* Number */}
                <span
                  className="absolute z-10"
                  style={{
                    fontFamily: "'Karantina', cursive",
                    fontSize: isMobile ? '1.2rem' : '4rem',
                    fontStyle: 'italic',
                    color: '#c1272d',
                    top: isMobile ? '50%' : '0.75rem',
                    left: isMobile ? '0.5rem' : '1rem',
                    transform: isMobile ? 'translateY(-50%)' : 'none',
                  }}
                >
                  {s.number}
                </span>

                {/* Collapsed label */}
                <span
                  ref={el => labelRefs.current[i] = el}
                  className="absolute z-10 pointer-events-none"
                  style={{
                    fontFamily: "'Impact','Arial Black',sans-serif",
                    fontSize: isMobile ? '0.85rem' : '1.75rem',
                    letterSpacing: '0.15em',
                    color: '#fff',
                    writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl',
                    textOrientation: 'mixed',
                    top: '50%',
                    left: '50%',
                    transform: isMobile ? 'translate(-30%,-50%)' : 'translate(-50%,-50%) rotate(180deg)',
                    opacity: isMobile ? 1 : (open ? 0 : 1),
                    transition: isMobile ? 'none' : 'opacity 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.title}
                </span>

                {/* Expanded content */}
                <div
                  ref={el => contentRefs.current[i] = el}
                  className={`absolute inset-0 flex flex-col items-center justify-center ${isMobile ? 'px-6' : 'px-10'}`}
                  style={{
                    opacity: isMobile ? 0 : (open ? 1 : 0),
                    transition: isMobile ? 'none' : (open ? `opacity 0.5s ease 0.2s` : 'opacity 0.3s ease'),
                  }}
                >
                  <h3
                    className={`font-black tracking-wider ${isMobile ? 'text-2xl mb-4' : 'text-3xl mb-6'}`}
                    style={{ fontFamily: "'Alexandria', sans-serif", color: '#0a1628' }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`text-center leading-relaxed italic max-w-md ${isMobile ? 'text-sm' : 'text-base'}`}
                    style={{ color: '#1a2a40', fontFamily: "'Alexandria', sans-serif" }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;