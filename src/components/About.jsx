import PropTypes from "prop-types";
import { motion } from 'framer-motion'
import { Bot, ChartNoAxesCombined, ChartSpline, Code2 } from 'lucide-react'

import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant} from '../utils/motion'
import { SectionWrapper } from '../hoc'

const serviceIcons = {
  'Software Developer': Code2,
  'Data Analyst': ChartNoAxesCombined,
  'Data Scientist': ChartSpline,
  'AI/ML Engineer': Bot,
}

const ServiceCard = ({ index, title}) => {
  const Icon = serviceIcons[title]

  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.5)}
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
  index: PropTypes.number.isRequired,
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
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-stack-md mx-auto max-w-5xl text-center text-body-lg text-muted'
      >
        I&apos;m a Computer Science graduate currently pursuing a Master&apos;s in Data Science, with experience in software engineering, machine learning, and full-stack web development. My technical experience includes building machine learning models (neural networks, regression, classification), developing full-stack applications with Flask, Django, and React, and implementing AI solutions such as medical image segmentation using R2U-Net in PyTorch. I enjoy working at the intersection of software engineering and data science—building scalable systems that transform data into actionable insights. I&apos;m particularly interested in roles involving machine learning engineering, web development, and data-driven system optimization.
      </motion.p>

      <div className='mt-stack-2xl mx-auto flex flex-wrap items-center justify-center gap-stack-xl'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

const About = SectionWrapper(AboutComponent, "about")

export default About