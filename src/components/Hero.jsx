import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { motion as motionTokens, styles } from '../styles'
import { fadeIn } from '../utils/motion'
import NeuralNetworkCanvas, { IntroOverlay, RestartButton } from './canvas/NeuralNetwork'

const Hero = () => {
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [phase, setPhase]         = useState('intro') // 'intro' | 'cnn'
  const [runId, setRunId]         = useState(0)       // bumped on restart to remount the canvas

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
          <p className={`${styles.heroSubText} mt-stack-sm max-w-5xl`}>
            I develop innovative software solutions, specializing in machine learning,
            web-based applications, and automation, with a strong foundation in
            programming languages and quality assurance.
          </p>
        </div>
      </div>

      {/* canvas + overlay */}
      <div ref={canvasRef}
        className="flex-1 flex items-center justify-center min-h-0 w-full relative"
      >
        {isVisible && (
          <>
            <IntroOverlay visible={phase === 'intro'} onStart={handleStart} />
            <RestartButton visible={phase === 'cnn'} onRestart={handleRestart} />
            <NeuralNetworkCanvas key={runId} phase={phase} />
            {phase === 'cnn' && (
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
            )}
          </>
        )}
      </div>

      {/* scroll indicator */}
      <div className='flex w-full items-center justify-center py-stack-sm'>
        <a href='#about' aria-label='Scroll to overview'>
          <div className='flex h-14 w-8 items-start justify-center rounded-round border-2 border-line bg-surface p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
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