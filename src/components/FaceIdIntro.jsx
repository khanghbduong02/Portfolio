import { useEffect, useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import PropTypes from 'prop-types'

const khangPhoto = `${import.meta.env.BASE_URL}faceid-photo.webp`

export function IntroOverlay({ onStart, visible, reducedMotion = false }) {
  const [morphing, setMorphing] = useState(false)

  useEffect(() => {
    if (visible) setMorphing(false)
  }, [visible])

  const handleClick = () => {
    if (morphing) return
    if (reducedMotion) {
      onStart?.()
      return
    }

    setMorphing(true)
    setTimeout(() => onStart?.(), 500)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
      gap: '1rem',
    }}>
      <style>{`
        @keyframes morph-to-square {
          0%   { border-radius: 50%; transform: scale(1);    opacity: 1; }
          55%  { border-radius: 6%;  transform: scale(0.9);  opacity: 1; }
          100% { border-radius: 2%;  transform: scale(0.55); opacity: 0; }
        }
        .nn-photo-wrap.morphing {
          animation: morph-to-square var(--duration-enter) var(--ease-enter) forwards;
        }
        @keyframes nn-photo-flash-scale {
          0%, 62%, 100% { transform: scale(1); }
          76% { transform: scale(1.03); }
        }
        .nn-photo-wrap {
          animation: nn-photo-flash-scale 1.8s var(--ease-enter) infinite;
          will-change: transform;
        }
        .nn-photo-wrap--reduced {
          animation: none;
          transform: scale(1);
          will-change: auto;
        }
        .nn-photo-trigger:focus-visible .nn-photo-wrap,
        .nn-photo-trigger:hover .nn-photo-wrap {
          animation: none;
          border-color: rgb(var(--color-accent-strong));
          transform: scale(1.025);
        }
        .nn-photo-action {
          align-items: center;
          background: rgb(var(--color-canvas) / 0.48);
          display: flex;
          inset: 0;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          transition: opacity var(--duration-fast) var(--ease-standard);
          z-index: 2;
        }
        .nn-photo-action-icon {
          color: rgb(var(--color-content));
          height: 2.25rem;
          transform: scale(0.86);
          transition: transform var(--duration-fast) var(--ease-standard);
          width: 2.25rem;
        }
        .nn-photo-trigger:focus-visible .nn-photo-action,
        .nn-photo-trigger:hover .nn-photo-action {
          opacity: 1;
        }
        .nn-photo-trigger:focus-visible .nn-photo-action-icon,
        .nn-photo-trigger:hover .nn-photo-action-icon {
          transform: scale(1);
        }
        .nn-photo-trigger:focus-visible .nn-photo-wrap {
          outline: 2px solid rgb(var(--color-focus));
          outline-offset: 4px;
        }
        .nn-text-fade.morphing { animation: fade-out var(--duration-standard) var(--ease-exit) forwards; }
        @keyframes fade-out { to { opacity: 0; } }
      `}</style>

      <p className={`nn-text-fade max-w-[80vw] text-center text-body font-label text-content ${morphing ? 'morphing' : ''}`} style={{
        margin: 0,
        pointerEvents: 'none',
      }}>
        That&apos;s me — but how does FaceID know that?
      </p>

      <button
        type='button'
        aria-label='Show the FaceID neural network visualization'
        className='nn-photo-trigger group relative cursor-pointer rounded-round border-0 bg-transparent p-0 focus:outline-none'
        style={{ pointerEvents: 'auto' }}
        onClick={handleClick}
      >
        <div className={`nn-photo-wrap ${reducedMotion ? 'nn-photo-wrap--reduced' : ''} overflow-hidden rounded-round border-2 border-accent transition-colors duration-fast ease-standard ${morphing ? 'morphing' : ''}`} style={{
          width:        'clamp(120px, min(80vw, 80vh), 260px)',
          height:       'clamp(120px, min(80vw, 80vh), 260px)',
          position:     'relative',
          zIndex:       1,
        }}>
          <img src={khangPhoto} alt="Khang" fetchPriority='high' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span className='nn-photo-action' aria-hidden='true'>
            <MousePointerClick className='nn-photo-action-icon' strokeWidth={1.8} />
          </span>
        </div>
      </button>

      <p className={`nn-text-fade text-meta text-muted ${morphing ? 'morphing' : ''}`} style={{
        margin:        0,
        pointerEvents: 'none',
      }}>
        Click to see how a machine sees me ✨
      </p>
    </div>
  )
}

export function RestartButton({ visible, onRestart }) {
  if (!visible) return null

  return (
    <button
      onClick={onRestart}
      className='absolute bottom-4 left-1/2 z-[11] -translate-x-1/2 rounded-control border border-line bg-surface px-3.5 py-1.5 text-meta font-label text-content transition duration-fast ease-standard hover:-translate-y-0.5 hover:border-accent hover:bg-surface-raised'
    >
      ↻ run it again
    </button>
  )
}

IntroOverlay.propTypes = {
  onStart:       PropTypes.func,
  visible:       PropTypes.bool.isRequired,
  reducedMotion: PropTypes.bool,
}

RestartButton.propTypes = {
  visible:   PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
}