import { useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      aria-label='Primary navigation'
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className='w-full flex justify-between items-center max-w-7x1 mx-auto'>
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='' aria-hidden='true' className='w-10 h-10 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Khang Duong
            <span className='xl:block hidden'>&nbsp;| Portfolio</span>
          </p>
        </Link>
        {/* Show all sections when screen is large */}
        <ul className='list-none hidden lg:flex flex-row gap-8'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title
                  ? "text-white"
                  : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        {/* Show menu icon when screen is small */}
        <div className='lg:hidden  flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-controls='mobile-navigation'
            aria-expanded={toggle}
            aria-label={toggle ? 'Close navigation menu' : 'Open navigation menu'}
            className='flex h-11 w-11 items-center justify-center rounded-control border-0 bg-transparent p-0'
            onClick={() => setToggle((isOpen) => !isOpen)}
          >
            <img
              src={toggle ? close : menu}
              alt=''
              aria-hidden='true'
              className='h-7 w-7 object-contain'
            />
          </button>
          <div id='mobile-navigation' className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start  flex-col gap-4'>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? "text-white"
                      : "text-secondary"
                  } hover:text-white text-[16px] font-poppins font-medium cursor-pointer`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar