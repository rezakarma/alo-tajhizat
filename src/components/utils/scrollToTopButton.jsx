import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if user has scrolled down enough to show the button
  const handleScroll = () => {
    if (window.scrollY > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? 'block' : 'hidden'
      }  fixed bottom-4 md:right-[21.5rem] lg:right-[30rem] 2xl:right-[48rem] 3xl:right-[65rem] 4xl:right-[77.5rem] px-4 py-2  rounded-full rotate-90`}
    >
    <svg xmlns="http://www.w3.org/2000/svg" className='hidden sm:block fill-primaryYellow' width="45" height="48" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
    </button>
  );
};

export default ScrollToTopButton;
