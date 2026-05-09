import { useState, useCallback, useRef, useEffect } from 'react';

function distributeToColumns(images) {
  const left = [];
  const right = [];
  images.forEach((img, i) => {
    if (i % 2 === 0) left.push(img);
    else right.push(img);
  });
  return { left, right };
}

export default function Gallery({ images = [] }) {
  const [animState, setAnimState] = useState('idle');

  // Reset animation state when images change
  useEffect(() => {
    setAnimState('idle');
  }, [images.length]);

  const { left, right } = distributeToColumns(images);

  const imgStyle = {
    width: '100%',
    height: '320px',
    borderRadius: '0.375rem',
    objectFit: 'fill',
    display: 'block',
  };

  if (images.length === 0) return null;

  return (
    <section
      id="gallery"
      className="gallery-section"
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        maxWidth: '92vw',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h2
        className="gallery-title"
        style={{
          fontFamily: 'Karantina, cursive',
          color: '#0D2C40',
          fontWeight: 'bold',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          flexShrink: 0,
        }}
      >
        Check Out Our Work
      </h2>

      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.5rem', padding: '0 3rem' }}>
        <div className="gallery-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignSelf: 'start' }}>
            {left.map((img, i) => (
              <div key={`l-${i}`} style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.375rem' }}>
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
              )
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignSelf: 'start' }}>
            {right.map((img, i) => (
              <div key={`r-${i}`} style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.375rem' }}>
                <img
                  src={img.src}
                  alt={img.alt || ''}
                  loading="lazy"
                  className="gallery-img"
                  style={imgStyle}
                />
              </div>
              )
            )}
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
