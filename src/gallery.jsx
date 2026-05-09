import { useState, useCallback, useRef, useEffect } from 'react';

export default function Gallery({ galleries = [] }) {
  const [page, setPage] = useState(0);
  const [animState, setAnimState] = useState('idle'); // idle | cover | reveal
  const pendingPage = useRef(null);
  const direction = useRef('forward'); // 'forward' | 'back'
  const coveredCount = useRef(0);
  const revealedCount = useRef(0);
  const totalPages = Math.max(1, galleries.length);

  // Reset animation state when images change
  useEffect(() => {
    setAnimState('idle');
  }, [images.length]);

  const currentImages = galleries[page]?.images || [];
  const imageCount = currentImages.length;

  const goToPage = useCallback(
    (nextPage) => {
      if (animState !== 'idle') return;
      if (nextPage < 0 || nextPage >= totalPages) return;

      pendingPage.current = nextPage;
      direction.current = nextPage > page ? 'forward' : 'back';
      coveredCount.current = 0;
      revealedCount.current = 0;
      setAnimState('cover');
    },
    [animState, totalPages, page],
  );

  const handleSingleCoverDone = () => {
    coveredCount.current += 1;
    if (coveredCount.current >= imageCount) {
      setPage(pendingPage.current);
      setAnimState('reveal');
    }
  };

  const handleSingleRevealDone = () => {
    revealedCount.current += 1;
    const nextCount = galleries[pendingPage.current]?.images?.length || 0;
    if (revealedCount.current >= nextCount) {
      setAnimState('idle');
    }
  };

  return (
    <section
      id="gallery"
      className="gallery-section"
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        maxWidth: '92vw',
        margin: '0 auto',
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Heading */}
      <h2
        className="gallery-title"
        style={{
          fontFamily: 'Karantina, cursive',
          color: '#0D2C40',
          fontWeight: 'bold',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          flexShrink: 0,
        }}
      >
        Check Out Our Work
      </h2>

      {/* Image grid */}
      <div className="gallery-grid-wrap" style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '0.75rem',
            height: '100%',
          }}
        >
          {currentImages.map((img, i) => (
            <div
              key={`${page}-${i}`}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.375rem' }}
            >
              <img
                src={img.src}
                alt={img.alt || ''}
                loading="lazy"
                className="gallery-img"
                style={{ width: '100%', height: '100%', display: 'block', borderRadius: '0.375rem' }}
              />
              {animState !== 'idle' && (
                <div
                  className={
                    animState === 'cover'
                      ? (direction.current === 'forward' ? 'gallery-curtain-in' : 'gallery-curtain-in-reverse')
                      : (direction.current === 'forward' ? 'gallery-curtain-out' : 'gallery-curtain-out-reverse')
                  }
                  onAnimationEnd={animState === 'cover' ? handleSingleCoverDone : handleSingleRevealDone}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#FFFFFF',
                    zIndex: 10,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: '0.75rem',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'Karantina, cursive',
            fontWeight: 'bold',
            fontSize: '1.75rem',
            color: '#0D2C40',
            minWidth: '1.5rem',
          }}
        >
          {page + 1}
        </span>

        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 0 || animState !== 'idle'}
          aria-label="Previous page"
          style={{
            background: 'none',
            border: 'none',
            cursor: page === 0 ? 'default' : 'pointer',
            opacity: page === 0 ? 0.35 : 1,
            fontSize: '1.5rem',
            padding: '0.25rem 0.5rem',
            color: '#0D2C40',
            transition: 'opacity 0.2s',
          }}
        >
          &#8592;
        </button>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages - 1 || animState !== 'idle'}
          aria-label="Next page"
          style={{
            background: 'none',
            border: 'none',
            cursor: page === totalPages - 1 ? 'default' : 'pointer',
            opacity: page === totalPages - 1 ? 0.35 : 1,
            fontSize: '1.5rem',
            padding: '0.25rem 0.5rem',
            color: '#0D2C40',
            transition: 'opacity 0.2s',
          }}
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}


