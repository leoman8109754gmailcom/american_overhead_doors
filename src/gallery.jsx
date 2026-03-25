import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Distributes images into two columns, alternating assignment so both
 * columns stay roughly balanced regardless of how many images are added.
 */
function distributeToColumns(images) {
  const left = [];
  const right = [];
  images.forEach((img, i) => {
    if (i % 2 === 0) left.push(img);
    else right.push(img);
  });
  return { left, right };
}

export default function Gallery({ galleries = [] }) {
  const [page, setPage] = useState(0);
  const [animState, setAnimState] = useState('idle'); // idle | cover | reveal
  const pendingPage = useRef(null);
  const direction = useRef('forward'); // 'forward' | 'back'
  const coveredCount = useRef(0);
  const revealedCount = useRef(0);
  const totalPages = Math.max(1, galleries.length);

  // Reset page when galleries change
  useEffect(() => {
    setPage(0);
    setAnimState('idle');
  }, [galleries.length]);

  // Total images currently showing (needed to know when all curtains finish)
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
    [animState, totalPages],
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
    // Use next gallery's image count for reveal
    const nextCount = galleries[pendingPage.current]?.images?.length || 0;
    if (revealedCount.current >= nextCount) {
      setAnimState('idle');
    }
  };

  const { left, right } = distributeToColumns(currentImages);

  const imgStyle = {
    width: '100%',
    height: '220px',
    borderRadius: '0.375rem',
    objectFit: 'fill',
    display: 'block',
  };

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '3rem 1.5rem',
        maxWidth: '960px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: 'Karantina, cursive',
          color: '#0D2C40',
          fontWeight: 'bold',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}
      >
        Check Out Our Work
      </h2>

      {/* Grid + animation wrapper */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.5rem' }}>
        {/* Image grid — two columns on desktop, single column on mobile */}
        <div className="gallery-grid">
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignSelf: 'start' }}>
            {left.map((img, i) => (
              <div key={`${page}-l-${i}`} style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.375rem' }}>
                <img
                  src={img.src}
                  alt={img.alt || ''}
                  loading="lazy"
                  className="gallery-img"
                  style={imgStyle}
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
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignSelf: 'start' }}>
            {right.map((img, i) => (
              <div key={`${page}-r-${i}`} style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.375rem' }}>
                <img
                  src={img.src}
                  alt={img.alt || ''}
                  loading="lazy"
                  className="gallery-img"
                  style={imgStyle}
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
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      {(
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '1.25rem',
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
      )}
    </section>
  );
}
