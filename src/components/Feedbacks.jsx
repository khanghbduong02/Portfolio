import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import { motion as motionTokens, styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, staggerContainer, textVariant } from '../utils/motion'
import { testimonials } from '../constants'

const FeedbackCard = ({ testimonial, name, designation, company, image }) => {
  return (
    <motion.div
      variants={fadeIn('', 0, 0.75)}
      className='surface-panel w-full p-stack-xl text-left xs:w-[490px]'
    >
      <div className='flex flex-col h-full min-h-[250px]'>
        {/* Quote mark */}
        <p className='flex text-section font-display text-content'>&quot;</p>

        {/* Testimonial text — grows to fill space */}
        <div className='mt-stack-xs flex-1 max-h-[106px] overflow-y-auto pr-stack-xs scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent'>
          <p className='text-body text-content'>{testimonial}</p>
        </div>

        {/* Author row — always below text, never overlaps */}
        <div className='mt-stack-lg bottom-0 left-0 right-0 flex items-center justify-between gap-stack-sm'>
          <div className='flex flex-col min-w-0'>
            <p className='text-body font-label text-content'>
              <span className='text-accent'>@</span> {name}
            </p>
            <p className='mt-stack-xs text-meta text-muted'>
              {designation} of {company}
            </p>
          </div>

          <img
            src={image}
            alt=''
            aria-hidden='true'
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
      </div>
    </motion.div>
  )
}

FeedbackCard.propTypes = {
  testimonial: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

const FeedbacksComponent = () => {
  return (
    <div className='mt-stack-xl border-y border-line bg-surface-raised'>
      <div className={`${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer(motionTokens.stagger)}
        className={`${styles.paddingX} -mt-stack-2xl flex flex-wrap justify-center gap-stack-lg pb-stack-xl`}
      >
        {testimonials.map((testimonial) => (
          <FeedbackCard key={testimonial.name} {...testimonial} />
        ))}
      </motion.div>
    </div>
  )
}

const Feedbacks = SectionWrapper(FeedbacksComponent, 'feedback')

export default Feedbacks