/* eslint-disable no-undef */
import { MotionConfig } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Project } from './components';

const App = () => {
  const basename = process.env.NODE_ENV === "production" ? "/Portfolio" : "/";

  return (
    <BrowserRouter basename={basename}>
      <MotionConfig reducedMotion="user">
        <div className="relative z-0 bg-primary">
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex="-1">
            <div className="hero-backdrop">
              <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Project />
            <Feedbacks />
            <Contact />
          </main>
        </div>
      </MotionConfig>
    </BrowserRouter>
  )
}

export default App
