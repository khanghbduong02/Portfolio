import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn } from '../utils/motion'

const SectionWrapper = (Component, idName) => function HOC() {
  return (
    <motion.section
      variants={fadeIn('up')}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: true, amount: 0.1 }}
      className={`${styles.padding} max-w-7xl mx-auto flex-col items-center justify-center relative z-0`}
    >
      <span className='hash-span' id={idName}>
        &nbsp;
      </span>
      <Component />
    </motion.section>
  )
}

export default SectionWrapper