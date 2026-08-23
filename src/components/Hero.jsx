import { motion, useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion as motionTokens, styles } from '../styles'
import { fadeIn } from '../utils/motion'
import { IntroOverlay, RestartButton } from './FaceIdIntro'
import PropTypes from 'prop-types'

// ── Ambient glitch ───────────────────────────────────────────────────────────
const HERO_TEXT = "The architecture doesn't exist yet. I want to be the one who designs it, trains it from scratch, runs the ablations, and ships it."
const HERO_CHARS = Array.from(HERO_TEXT)
const NOISE_CHARS = '▓▒░▄▀■□!@#$%∑∆∇'
const GLITCH_INDICES = HERO_CHARS.map((_, i) => i).filter(i => HERO_TEXT[i] !== ' ')

function SignalNoiseEffect({ reduceMotion }) {
  const [display, setDisplay] = useState(HERO_CHARS.slice())

  useEffect(() => {
    if (reduceMotion) return
    let timeoutId
    let mounted = true

    const glitch = () => {
      const count = Math.floor(Math.random() * 4) + 1
      const pool = [...GLITCH_INDICES]
      const corrupted = []
      for (let k = 0; k < count; k++) {
        if (!pool.length) break
        corrupted.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
      }
      if (!mounted) return
      setDisplay(HERO_CHARS.map((c, i) =>
        corrupted.includes(i) ? NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)] : c
      ))
      timeoutId = setTimeout(() => {
        if (!mounted) return
        setDisplay(HERO_CHARS.slice())
        timeoutId = setTimeout(glitch, 700 + Math.random() * 1300)
      }, 50 + Math.random() * 100)
    }

    timeoutId = setTimeout(glitch, 300 + Math.random() * 800)
    return () => { mounted = false; clearTimeout(timeoutId) }
  }, [reduceMotion])

  return (
    <p className={`${styles.heroSubText} mt-stack-sm max-w-5xl`}>
      {display.join('')}
    </p>
  )
}
SignalNoiseEffect.propTypes = { reduceMotion: PropTypes.bool }

const CYCLING_TERMS = [
  'Transformer Architecture',
  'Neural Architecture Search',
  'Convolutional Neural Networks',
  'Recurrent Networks & LSTMs',
  'Diffusion Models',
  'Graph Neural Networks',
  'Attention Mechanisms',
  'Self-Supervised Learning',
]

function CyclingTypeEffect({ reduceMotion }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    if (reduceMotion) { setText(CYCLING_TERMS[0]); return }
    const target = CYCLING_TERMS[idx]
    let id
    if (!erasing) {
      if (text.length < target.length)
        id = setTimeout(() => setText(target.slice(0, text.length + 1)), 65)
      else
        id = setTimeout(() => setErasing(true), 1600)
    } else {
      if (text.length > 0)
        id = setTimeout(() => setText(t => t.slice(0, -1)), 30)
      else { setIdx(i => (i + 1) % CYCLING_TERMS.length); setErasing(false) }
    }
    return () => clearTimeout(id)
  }, [text, erasing, idx, reduceMotion])

  return (
    <div className='mt-stack-xs flex items-center gap-stack-xs font-mono text-body-lg'>
      <span className='select-none' style={{ color: 'rgb(var(--color-accent) / 0.45)' }}>›</span>
      <span className='text-accent'>{text}</span>
      <span className='animate-pulse text-accent'>_</span>
    </div>
  )
}
CyclingTypeEffect.propTypes = { reduceMotion: PropTypes.bool }

const loadNeuralNetwork = () => import('./canvas/NeuralNetwork')
const NeuralNetworkCanvas = lazy(loadNeuralNetwork)

const Hero = () => {
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [phase, setPhase]         = useState('intro') // 'intro' | 'cnn'
  const [runId, setRunId]         = useState(0)       // bumped on restart to remount the canvas
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )
    if (canvasRef.current) observer.observe(canvasRef.current)
    return () => observer.disconnect()
  }, [])

  const handleStart = () => {
    if (phase !== 'intro') return
    setPhase('cnn')
  }

  const handleRestart = () => {
    setPhase('intro')
    setRunId(id => id + 1)   // force NeuralNetworkCanvas to remount, resetting all internal animation state
  }

  return (
    <motion.section
      className='relative z-0 flex h-dvh w-full flex-col overflow-hidden'
      variants={fadeIn('up')}
      initial='hidden'
      animate='show'
    >
      {/* hero text */}
      <div className={`${styles.paddingX} mx-auto flex w-full max-w-7xl shrink-0 flex-row items-start gap-stack-md pt-24 md:pt-28`}>
        <div className='mt-stack-xs flex flex-col items-center justify-center'>
          <div className='h-4 w-4 rounded-round bg-accent' />
          <div className='h-32 w-px bg-accent/60 sm:h-48' />
        </div>
        <div>
          <h1 className={styles.heroHeadText}>
            Hi, I&apos;m
            <span className='text-accent'> Khang</span>
          </h1>
          <SignalNoiseEffect reduceMotion={reduceMotion} />
          <CyclingTypeEffect reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* canvas + overlay */}
      <div ref={canvasRef}
        className="flex-1 flex items-center justify-center min-h-0 w-full relative"
      >
        {isVisible && (
          <>
            <IntroOverlay reducedMotion={reduceMotion} visible={phase === 'intro'} onStart={handleStart} />
            <RestartButton visible={phase === 'cnn'} onRestart={handleRestart} />
            {phase === 'cnn' && (
              <Suspense fallback={null}>
                <NeuralNetworkCanvas key={runId} reducedMotion={reduceMotion} phase={phase} />
                <div
                  style={{
                    position:      'absolute',
                    bottom:        '52px',
                    left:          '50%',
                    transform:     'translateX(-50%)',
                    textAlign:     'center',
                    pointerEvents: 'none',
                    zIndex:        10,
                    width:         '90%',
                    maxWidth:      '90vw',
                  }}
                >
                  <p style={{
                    color:         'rgb(var(--color-content))',
                    fontSize:      'clamp(0.875rem, 1.4vw, 1.25rem)',
                    fontWeight:    600,
                    letterSpacing: 0,
                    margin:        0,
                    whiteSpace:    'nowrap',
                    overflow:      'hidden',
                    textOverflow:  'ellipsis',
                  }}>
                    Pixels → Patterns → &quot;It&apos;s Khang!&quot;
                  </p>
                  <p style={{
                    color:         'rgb(var(--color-muted))',
                    fontSize:      'clamp(0.75rem, 1vw, 0.875rem)',
                    letterSpacing: 0,
                    marginTop:     '0.25rem',
                  }}>
                    drag to rotate
                  </p>
                </div>
              </Suspense>
            )}
          </>
        )}
      </div>

      {/* scroll indicator */}
      <div className='flex w-full items-center justify-center py-stack-sm'>
        <a href='#about' aria-label='Scroll to overview'>
          <div className='flex h-14 w-8 items-start justify-center rounded-round border-2 border-line bg-surface p-2'>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 24, 0] }}
              transition={{ duration: 1.5, ease: motionTokens.easing.enter, repeat: Infinity, repeatType: 'loop' }}
              className='mb-1 h-2.5 w-2.5 rounded-round bg-accent'
            />
          </div>
        </a>
      </div>
    </motion.section>
  )
}

export default Hero