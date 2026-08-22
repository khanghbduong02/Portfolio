import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'

const ContactComponent = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after first load
        }
      },
      { threshold: 0.3 } // Trigger when 30% is visible
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({...form, [name]: value })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    emailjs.send(
      'service_mn3qg6u',
      'template_frt91ss',
      {
        from_name: form.name,
        to_name: 'Khang',
        from_email: form.email,
        to_email: 'huynhbaokhangduong@gmail.com',
        message: form.message
      },
      '2OuPUN0DQ1JfVciGA'
    )
    .then(() => {
      setLoading(false)
      alert('Thank you so much! I will get back to you as soon as possible.')
      
      setForm({ name: '', email: '', message: '' })
    }, (error) => {
      setLoading(false)

      console.log(error)

      alert('Something when wrong.')
    })
  }

  return (
    <div ref={canvasRef} className='flex w-full flex-col-reverse gap-stack-xl overflow-hidden xl:flex-row'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='surface-panel flex-[0.75] p-stack-lg text-left'
      >
        <p className={`${styles.sectionSubText} !text-left`}>Get in touch</p>
        <h2 className={`${styles.sectionHeadText} !text-left`}>Contact.</h2>

        {/* Contact shortcut buttons */}
        <div className='mt-stack-lg flex flex-wrap justify-center gap-stack-md'>
          <a href='mailto:huynhbaokhangduong@gmail.com'
            className='action-button min-w-[130px] max-w-[150px] flex-1'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="action-button__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Me
          </a>

          <a href='https://www.linkedin.com/in/khang-hb-duong/'
            target='_blank'
            rel='noopener noreferrer'
            className='action-button min-w-[130px] max-w-[150px] flex-1'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="action-button__icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>

          <a href='https://github.com/khanghbduong02'
            target='_blank'
            rel='noopener noreferrer'
            className='action-button min-w-[130px] max-w-[150px] flex-1'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="action-button__icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-stack-base flex flex-col gap-stack-base'
        >
          <label className='flex flex-col'>
            <span className='mb-stack-md text-body font-label text-content'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='What&apos;s your name?'
              className='form-field text-body font-body'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-stack-md text-body font-label text-content'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='What&apos;s your email?'
              className='form-field text-body font-body'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-stack-md text-body font-label text-content'>Your Message</span>
            <textarea
              rows='7'
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What do you want to say?'
              className='form-field text-body font-body'
            />
          </label>

          <button
            type='submit'
            className='action-button w-full'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
      
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-[850px] md:h-[550px] md:w-[550px] sm:w-[450px] sm:h-[450px] h-[260px] w-[260px] m-auto'
      >
        {isVisible && <EarthCanvas />}
      </motion.div>
    </div>
  )
}

const Contact = SectionWrapper(ContactComponent, 'contact')

export default Contact