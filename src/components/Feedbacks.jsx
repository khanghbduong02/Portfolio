import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { testimonials } from '../constants'

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => {
  return (
    <motion.div
      variants={fadeIn('', '', 0.5 * index, 0.75)}
      className='bg-black-200 p-10 rounded-3xl text-left xs:w-[490px] w-full'
    >
      <div className='flex flex-col h-full min-h-[250px]'>
        {/* Quote mark */}
        <p className='text-white flex font-black text-[48px]'>&quot;</p>

        {/* Testimonial text — grows to fill space */}
        <div className='mt-1 flex-1 max-h-[106px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent'>
          <p className='text-white tracking-wider text-[14px]'>{testimonial}</p>
        </div>

        {/* Author row — always below text, never overlaps */}
        <div className='mt-7 bottom-0 left-0 right-0 flex justify-between items-center gap-3'>
          <div className='flex flex-col min-w-0'>
            <p className='text-white font-medium text-[16px]'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='mt-1 text-secondary text-[12px]'>
              {designation} of {company}
            </p>
          </div>

          <img
            src={image}
            alt={`feedback-by-${name}`}
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
      </div>
    </motion.div>
  )
}

FeedbackCard.propTypes = {
  index: PropTypes.number.isRequired,
  testimonial: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

const FeedbacksComponent = () => {
  return (
    <div className='mt-12 bg-black-100 rounded-[20px]'>
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap justify-center gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

const Feedbacks = SectionWrapper(FeedbacksComponent, 'feedback')

export default Feedbacks