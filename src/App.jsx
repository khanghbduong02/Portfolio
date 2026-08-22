/* eslint-disable no-undef */
import { BrowserRouter } from 'react-router-dom';

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Project, StarsCanvas } from './components';

const App = () => {
  const basename = process.env.NODE_ENV === "production" ? "/Portfolio" : "/";

  return (
    <BrowserRouter basename={basename}>
      <div className="relative z-0 bg-primary">
        <div className="hero-backdrop">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Project />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
