import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <a
      href="#"
      className="back-to-top"
      style={{ display: isVisible ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }}
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </a>
  );
};

export default BackToTop;
