import PropTypes from 'prop-types'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'

import 'react-vertical-timeline-component/style.min.css'

import { styles } from '../styles'
import { globe } from '../assets'
import { experiences } from '../constants'
import { SectionWrapper } from '../hoc'
import { textVariant } from '../utils/motion'

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      className='vertical-timeline-element--work'
      contentStyle={{
        background: 'rgb(var(--color-surface))',
        color: 'rgb(var(--color-content))',
        border: '1px solid rgb(var(--color-line))',
        boxShadow: 'var(--shadow-card)',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgb(var(--color-surface))' }}
      textClassName='experience-timeline-content'
      date={experience.date}
      dateClassName='experience-timeline-date'
      iconStyle={{
        background: 'rgb(var(--color-surface-raised))',
        border: '1px solid rgb(var(--color-line))',
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          {experience.icon ? (
            <img
              src={experience.icon}
              alt={experience.company_name}
              className='w-[75%] h-[75%] object-contain'
            />
          ) : (
            <span className='text-white text-xs font-bold tracking-wider'>
              {experience.iconLabel}
            </span>
          )}
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>{experience.company_name}</p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>

      {experience.website_url && (
        <div className='experience-website-action mt-5 border-t border-white/10 pt-4'>
          <a
            href={experience.website_url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Visit ${experience.company_name} website`}
            className='flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-black-200 px-4 py-2 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-white/10 sm:inline-flex sm:w-auto'
          >
            <img src={globe} alt='' aria-hidden='true' className='h-4 w-4 flex-shrink-0' />
            Visit website
          </a>
        </div>
      )}
    </VerticalTimelineElement>
  )
}

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    iconLabel: PropTypes.string,
    date: PropTypes.string.isRequired,
    website_url: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.string).isRequired
  })
}

const ExperienceComponent = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

const Experience = SectionWrapper(ExperienceComponent, 'work')

export default Experience