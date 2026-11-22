import PropTypes from "prop-types";
import { motion } from 'framer-motion'
import { Bot, ChartNoAxesCombined, ChartSpline, Code2 } from 'lucide-react'

import { motion as motionTokens, styles } from '../styles'
import { services } from '../constants'
import { fadeIn, staggerContainer, textVariant} from '../utils/motion'
import { SectionWrapper } from '../hoc'

const serviceIcons = {
  'Software Developer': Code2,
  'Data Analyst': ChartNoAxesCombined,
  'Data Scientist': ChartSpline,
  'AI/ML Engineer': Bot,
}

const ServiceCard = ({ title}) => {
  const Icon = serviceIcons[title]

  return (
    <motion.div
      variants={fadeIn("right")}
      className='xs:w-[250px] w-full'
    >
      <div className='interactive-card flex min-h-[280px] flex-col items-center justify-evenly px-stack-xl py-stack-md'>
          <div className='flex h-16 w-16 items-center justify-center rounded-control border border-accent/30 bg-accent/10 text-accent'>
            <Icon aria-hidden='true' className='h-8 w-8' strokeWidth={1.75} />
          </div>
          <h3 className='text-card-title text-center font-heading text-content'>{title}</h3>
      </div>
    </motion.div>
  )
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
}

const AboutComponent = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", 0.1, 1)}
        className='mt-stack-md mx-auto max-w-5xl text-center text-body-lg text-muted'
      >
        I&apos;m a Computer Science graduate currently pursuing a Master&apos;s in Data Science, with experience across software engineering, machine learning, and full-stack web development. I build machine learning systems end to end: PyTorch computer-vision models, scikit-learn surrogates for storage-performance tuning, and reinforcement-learning agents such as an AlphaZero-style Ô ăn quan player with a hand-written NumPy policy/value network, PUCT search, and a multiprocess self-play loop. I also ship the software around those models with Flask, Django, and React, so results become tools people can actually use. I enjoy working where systems engineering and data science meet, and I&apos;m particularly interested in roles involving machine learning engineering, applied research, and data-driven system optimization.
      </motion.p>

      <motion.div
        variants={staggerContainer(motionTokens.stagger)}
        className='mt-stack-2xl mx-auto flex flex-wrap items-center justify-center gap-stack-xl'
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </motion.div>
    </>
  )
}

const About = SectionWrapper(AboutComponent, "about")

export default About