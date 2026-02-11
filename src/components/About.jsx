// import React from 'react'
import Tilt from 'react-parallax-tilt'
import PropTypes from "prop-types";
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant} from '../utils/motion'
import { SectionWrapper } from '../hoc'

const ServiceCard = ({ index, title, icon}) => {
  return (
    <Tilt
      className='xs:w-[250px] w-full'
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1}
      transitionSpeed={450}
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.5)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired
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
        className='mt-4 text-center text-secondary mx-auto text-[17px] max-w-5xl leading-[30px]'
      >
        I&apos;m a Computer Science graduate currently pursuing a Master&apos;s in Data Science, with experience in software engineering, machine learning, and full-stack web development. My technical experience includes building machine learning models (neural networks, regression, classification), developing full-stack applications with Flask, Django, and React, and implementing AI solutions such as medical image segmentation using R2U-Net in PyTorch. I enjoy working at the intersection of software engineering and data science—building scalable systems that transform data into actionable insights. I&apos;m particularly interested in roles involving machine learning engineering, web development, and data-driven system optimization.
      </motion.p>

      <div className='mt-20 mx-auto flex flex-wrap items-center justify-center gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

const About = SectionWrapper(AboutComponent, "about")

export default About