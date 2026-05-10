import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { styles } from '../styles'
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
    <section className='w-full h-dvh flex flex-col overflow-hidden relative z-0'>
      {/* hero text */}
      <div className={`${styles.paddingX} inset-0 max-w-7xl max-h-[35vh] mx-auto flex flex-row items-start gap-5 mt-20`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m
            <span className='text-[#915eff]'> Khang</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
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
                  color:         '#c4b5fd',
                  fontSize:      'clamp(13px, 1.6vw, 28px)',
                  fontWeight:    600,
                  letterSpacing: '0.08em',
                  textShadow:    '0 0 14px #915eff',
                  margin:        0,
                  whiteSpace:    'nowrap',
                  overflow:      'hidden',
                  textOverflow:  'ellipsis',
                }}>
                  Pixels → Patterns → &quot;It&apos;s Khang!&quot;
                </p>
                <p style={{
                  color:         '#a78bfa',
                  fontSize:      'clamp(10px, 1.1vw, 18px)',
                  letterSpacing: '0.08em',
                  marginTop:     '4px',
                }}>
                  drag to rotate
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* scroll indicator */}
      <div className='w-full flex justify-center items-center py-3'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero