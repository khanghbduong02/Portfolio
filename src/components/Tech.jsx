import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BrainCircuit, Code2, Gamepad2, Terminal } from 'lucide-react'
import PropTypes from 'prop-types'
// Previous technology-balls canvas imports, retained for restoration.
// import { Canvas } from "@react-three/fiber"
// import { Preload, View } from "@react-three/drei"

import { motion as motionTokens, styles } from '../styles'
// import { BallView } from "./canvas"
import { SectionWrapper } from "../hoc"
import { technologies, technologyGroups } from "../constants"
import { fadeIn, staggerContainer, textVariant } from '../utils/motion'

const technologyByName = new Map(technologies.map((technology) => [technology.name, technology]))
const skillId = (groupTitle, skillName) => `${groupTitle}::${skillName}`
const groupIcons = {
  'Machine Learning & Data': BrainCircuit,
  'Web Applications': Code2,
  'Programming & Tooling': Terminal,
  'Interactive Systems': Gamepad2,
}
const orbitalPeriods = {
  alpha: 96,
  beta: 78,
  gamma: 62,
  delta: 50,
  epsilon: 40,
  zeta: 32,
  eta: 26,
}
const orbitalTrajectories = {
  7: [
    { track: 'alpha', phase: 0 },
    { track: 'beta', phase: 13.889 },
    { track: 'gamma', phase: 27.778 },
    { track: 'delta', phase: 41.667 },
    { track: 'epsilon', phase: 55.556 },
    { track: 'zeta', phase: 69.444 },
    { track: 'eta', phase: 83.333 },
  ],
  4: [
    { track: 'alpha', phase: 0 },
    { track: 'beta', phase: 25 },
    { track: 'gamma', phase: 50 },
    { track: 'delta', phase: 75 },
  ],
  3: [
    { track: 'alpha', phase: 0 },
    { track: 'beta', phase: 33.333 },
    { track: 'gamma', phase: 66.667 },
  ],
}

const groupId = (title) => `skill-group-${title.replace(/\s|&/g, '-').toLowerCase()}`

const TechnologyNode = ({ skill, orbit, isActive, onActivate, onFocus, onDeactivate }) => {
  const technology = technologyByName.get(skill.name)

  if (!technology) return null

  const orbitStyle = {
    '--orbit-duration': `${orbitalPeriods[orbit.track]}s`,
    '--orbit-delay': `-${(orbitalPeriods[orbit.track] * orbit.phase / 100).toFixed(2)}s`,
  }

  return (
    <div className={`skill-orbit skill-orbit--${orbit.track} ${isActive ? 'is-paused' : ''}`} style={orbitStyle}>
      <span className='skill-orbit__trajectory' aria-hidden='true' />
      <div className='skill-orbit__carrier'>
        <button
          type='button'
          className={`skill-node skill-node--${skill.evidence} ${isActive ? 'is-active' : ''}`}
          aria-label={`${skill.name}, ${skill.evidence} project-backed focus`}
          aria-pressed={isActive}
          onMouseEnter={onActivate}
          onMouseLeave={onDeactivate}
          onFocus={onFocus}
          onBlur={onDeactivate}
          onClick={onActivate}
        >
          <div className='skill-node__body'>
            <div className='skill-node__orb' title={`${skill.name}: ${skill.evidence} project-backed focus`}>
              <img src={technology.icon} alt='' aria-hidden='true' className='skill-node__icon' />
            </div>
            <span className='skill-node__label'>{skill.name}</span>
          </div>
        </button>
      </div>
    </div>
  )
}

TechnologyNode.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    evidence: PropTypes.string.isRequired,
  }).isRequired,
  orbit: PropTypes.shape({
    track: PropTypes.string.isRequired,
    phase: PropTypes.number.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
}

const TechComponent = () => {
  const [activeSkill, setActiveSkill] = useState(null)
  const headingRef = useRef(null)
  const [isSystemsVisible, setIsSystemsVisible] = useState(false)

  const activateSkill = (id) => setActiveSkill(id)
  const clearSkill = (id) => setActiveSkill((currentSkill) => currentSkill === id ? null : currentSkill)

  useEffect(() => {
    const target = headingRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsSystemsVisible(true)
        observer.unobserve(entry.target)
      },
      { threshold: 0.1 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  /*
   * Previous interactive technology-balls canvas, retained for restoration.
   * Uncomment this setup and the JSX block below to restore it.
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])
  */

  return (
    <>
      <motion.div ref={headingRef} variants={textVariant()}>
        <p className={styles.sectionSubText}>What I am comfortable with</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      {/*
      <div ref={ref} id="canvasContainer" className="mt-10">
        {isVisible && (
          <>
            <div className="container flex flex-wrap justify-center items-center w-full gap-10 mx-auto">
              {technologies.map((tech, index) => (
                <div key={index}>
                  <BallView icon={tech.icon} />
                  <p className="text-center text-secondary text-[17px] mx-auto">{tech.name}</p>
                </div>
              ))}
            </div>

            <Canvas
              style={{ position: 'fixed' }}
              className="w-full h-full top-0 bottom-0 right-0 left-0 overflow-hidden"
              dpr={[1, 2]}
              eventSource={document.getElementById("canvasContainer")}
            >
              <View.Port />
              <Preload all />
            </Canvas>
          </>
        )}
      </div>
      */}

      {isSystemsVisible && (
        <motion.section
          className='skill-map mt-stack-2xl'
          aria-label='Technology groups'
          initial='hidden'
          animate='show'
          variants={staggerContainer(motionTokens.stagger, motionTokens.duration.fast)}
        >
          <div className='skill-map__field'>
            {technologyGroups.map((group) => (
              <motion.section
                key={group.title}
                className='skill-map__group'
                aria-labelledby={groupId(group.title)}
                variants={fadeIn('up', 0, motionTokens.duration.standard)}
              >
                <div className={`skill-map__orbit skill-map__orbit--${group.skills.length}`}>
                  <h4 id={groupId(group.title)} className='skill-map__group-title'>
                    {group.title}
                  </h4>
                  <div className='skill-map__core'>
                    <div className='skill-map__star' aria-hidden='true'>
                      {(() => {
                        const GroupIcon = groupIcons[group.title]
                        return <GroupIcon className='skill-map__star-icon' strokeWidth={1.6} />
                      })()}
                    </div>
                  </div>
                  {group.skills.map((skill, index) => (
                    <TechnologyNode
                      key={skill.name}
                      skill={skill}
                      orbit={orbitalTrajectories[group.skills.length][skill.orbit ?? index]}
                      isActive={activeSkill === skillId(group.title, skill.name)}
                      onActivate={() => activateSkill(skillId(group.title, skill.name))}
                      onFocus={() => activateSkill(skillId(group.title, skill.name))}
                      onDeactivate={() => clearSkill(skillId(group.title, skill.name))}
                    />
                  ))}
                </div>
                <div className='skill-map__planet-controls' role='group' aria-label={`${group.title} planets`}>
                  {group.skills.map((skill) => {
                    const id = skillId(group.title, skill.name)
                    const isActive = activeSkill === id

                    return (
                      <button
                        key={skill.name}
                        type='button'
                        className={`skill-map__planet-button ${isActive ? 'is-active' : ''}`}
                        aria-pressed={isActive}
                        onMouseEnter={() => activateSkill(id)}
                        onMouseLeave={() => clearSkill(id)}
                        onFocus={() => activateSkill(id)}
                        onBlur={() => clearSkill(id)}
                        onClick={() => activateSkill(id)}
                      >
                        {skill.name}
                      </button>
                    )
                  })}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.section>
      )}
    </>
  )
}

const Tech = SectionWrapper(TechComponent, 'tech')

export default Tech