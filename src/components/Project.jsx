import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import { motion as motionTokens, styles } from '../styles'
import { github, globe } from '../assets'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, staggerContainer, textVariant } from '../utils/motion'

const ProjectCard = ({ name, description, tags, image, coverLabel, source_code_link, web_url }) => {
  return (
    <motion.div
      variants={fadeIn('up', 0, 0.75)}
      className='flex w-full sm:w-[360px]'
    >
      <article className='interactive-card flex w-full flex-col p-stack-md'>
        {/* Image — fixed height, no shrink */}
        <div className='relative w-full h-[230px] flex-shrink-0'>
          {image ? (
            <img
              src={image}
              alt={name}
              className='h-full w-full rounded-card object-cover'
            />
          ) : (
            <div
              role='img'
              aria-label={`${name} project cover`}
              className='flex h-full w-full items-center justify-center rounded-card bg-canvas px-stack-base'
            >
              <span className='text-card-title text-center font-heading text-content'>
                {coverLabel || name}
              </span>
            </div>
          )}
        </div>

        {/* Text content — grows and centers its content vertically */}
        <div className='mt-stack-md flex flex-1 flex-col justify-center'>
          <h3 className='text-card-title text-center font-heading text-content'>{name}</h3>
          <p className='mt-stack-xs text-center text-meta text-muted'>{description}</p>
        </div>

        {/* Tags — always at bottom, with a subtle divider */}
        <div className='mt-stack-sm flex flex-wrap items-center justify-center gap-stack-xs'>
          {tags.map((tag) => (
            <p key={tag.name} className='text-meta text-accent'>
              #{tag.name}
            </p>
          ))}
        </div>

        {/* Buttons */}
        {(web_url || source_code_link) && (
          <div className='mt-stack-sm flex items-stretch justify-center gap-stack-sm'>
            {web_url && (
              <a
                href={web_url}
                target='_blank'
                rel='noopener noreferrer'
                className='action-button min-w-0 flex-1'
              >
                <img src={globe} alt='website' className="action-button__icon" />
                Website
              </a>
            )}
            {source_code_link && (
              <a
                href={source_code_link}
                target='_blank'
                rel='noopener noreferrer'
                className='action-button min-w-0 flex-1'
              >
                <img src={github} alt='source code' className="action-button__icon" />
                Source Code
              </a>
            )}
          </div>
        )}
      </article>
    </motion.div>
  )
}

ProjectCard.propTypes = {
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
          variants={fadeIn("", 0.1, 1)}
          className='mt-stack-sm mx-auto max-w-4xl text-center text-body-lg text-muted'
        >
          These projects showcase my skills and experience through real-world work. Each includes a concise overview and, where available, a live demo or source repository.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer(motionTokens.stagger)}
        className='mt-stack-2xl mx-auto flex flex-wrap items-stretch justify-center gap-stack-lg'
      >
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </motion.div>
    </>
  )
}

const Project = SectionWrapper(ProjectComponent, 'project')

export default Project