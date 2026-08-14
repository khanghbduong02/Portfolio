import Tilt from 'react-parallax-tilt'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { github, globe } from '../assets'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({ index, name, description, tags, image, coverLabel, source_code_link, web_url }) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1}
      transitionSpeed={450}
      className='sm:w-[360px] w-[400px] flex'
    >
      <motion.div
        variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
        className='bg-tertiary p-5 rounded-2xl flex flex-col w-full'
      >
        {/* Image — fixed height, no shrink */}
        <div className='relative w-full h-[230px] flex-shrink-0'>
          {image ? (
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover rounded-2xl'
            />
          ) : (
            <div
              role='img'
              aria-label={`${name} project cover`}
              className='w-full h-full rounded-2xl bg-black-200 px-6 flex items-center justify-center'
            >
              <span className='text-center text-white text-[20px] font-bold leading-7'>
                {coverLabel || name}
              </span>
            </div>
          )}
        </div>

        {/* Text content — grows and centers its content vertically */}
        <div className='mt-5 flex-1 flex flex-col justify-center'>
          <h3 className='text-white text-center font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-center text-[14px]'>{description}</p>
        </div>

        {/* Tags — always at bottom, with a subtle divider */}
        <div className='mt-4 flex flex-wrap items-center justify-center gap-2'>
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        {/* Buttons */}
        {(web_url || source_code_link) && (
          <div className='mt-4 flex items-stretch justify-center gap-3'>
            {web_url && (
              <button
                onClick={() => window.open(web_url, '_blank')}
                className='flex-1 min-w-0 py-2 px-4 bg-black-200 hover:bg-white/10 border border-white/20 transition-colors duration-200 rounded-lg text-white text-[13px] font-medium flex items-center justify-center gap-2'
              >
                <img src={globe} alt='website' className="w-4 h-4 flex-shrink-0" />
                Website
              </button>
            )}
            {source_code_link && (
              <button
                onClick={() => window.open(source_code_link, '_blank')}
                className='flex-1 min-w-0 py-2 px-4 bg-black-200 hover:bg-white/10 border border-white/20 transition-colors duration-200 rounded-lg text-white text-[13px] font-medium flex items-center justify-center gap-2'
              >
                <img src={github} alt='source code' className="w-4 h-4 flex-shrink-0" />
                Source Code
              </button>
            )}
          </div>
        )}
      </motion.div>
    </Tilt>
  )
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })),
  image: PropTypes.string,
  coverLabel: PropTypes.string,
  source_code_link: PropTypes.string.isRequired,
  web_url: PropTypes.string,
}

const ProjectComponent = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Project.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-center text-secondary text-[17px] mx-auto max-w-4xl leading-[30px]'
        >
          These projects showcase my skills and experience through real-world work. Each includes a concise overview and, where available, a live demo or source repository.
        </motion.p>
      </div>

      <div className='mt-20 mx-auto flex flex-wrap items-stretch justify-center gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

const Project = SectionWrapper(ProjectComponent, 'project')

export default Project