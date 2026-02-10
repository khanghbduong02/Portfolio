import Tilt from 'react-parallax-tilt'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { github } from '../assets'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({ index, name, description, tags, image, source_code_link, web_url }) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1}
      transitionSpeed={450}
      className='sm:w=[360px] w-[400px]'
    >
      <motion.div
        variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
        className='bg-tertiary p-5 rounded-2xl'
      >
        <div className='relative w-full h-[230px]'>
          {web_url ? (
            <a href={web_url} target="_blank" rel="noopener noreferrer" title="Website">
              <img
                src={image}
                alt={name}
                className='w-full h-full object-cover rounded-2xl'
              />
            </a>
          ) : (
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover rounded-2xl'
            />
          )}

          <div className='absolute top-3 right-3 w-10 h-10 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, '_blank')}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              title="GitHub Link"
              >
              <img
                src={github}
                alt='source code'
                className='w-3/4 h-3/4 object-contain'
                />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white text-center font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-center text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap items-center justify-center gap-2'>
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
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
  image: PropTypes.string.isRequired,
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
          Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with link to code repository. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 mx-auto flex flex-wrap items-center justify-center gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

const Project = SectionWrapper(ProjectComponent, 'project')

export default Project