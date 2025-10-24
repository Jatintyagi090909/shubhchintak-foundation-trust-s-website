import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/images/logo.jpeg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if the current path matches the navigation item
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Add scrolled class to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileSidebarOpen &&
        !event.target.closest('.mobile-sidebar') &&
        !event.target.closest('.mobile-menu-button')
      ) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileSidebarOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header id="header" className={isScrolled ? 'header-scrolled' : ''}>
      <div className="container d-flex">
        <div className="logo mr-auto">
          <Link to="/" className="logo-link">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Shubhchintak Foundation Trust Logo" style={{ height: '50px', marginRight: '10px' }} />
              <p id="logo-text" className="pl-2 mr-5 logo-title">
                SHUBHCHINTAK FOUNDATION TRUST
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Keep your existing one */}
        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={isActive('/events') ? 'active' : ''}>
              <Link to="/events">Events</Link>
            </li>
            <li className={isActive('/gallery') ? 'active' : ''}>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li className={isActive('/about') ? 'active' : ''}>
              <Link to="/about">About</Link>
            </li>
            <li className={isActive('/contact') ? 'active' : ''}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button 
          className="mobile-menu-button d-lg-none"
          onClick={toggleMobileSidebar}
          aria-label="Toggle mobile menu"
        >
          <FiMenu size={24} className="menu-icon" />
        </button>

        {/* Mobile Sidebar */}
        <div className={`mobile-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-logo-area">
            <button 
              className="mobile-sidebar-close"
              onClick={toggleMobileSidebar}
              aria-label="Close mobile menu"
            >
              <FiX size={28} />
            </button>
          </div>
          <nav className="mobile-sidebar-menu">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={isActive(item.path) ? 'active' : ''}
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Overlay for Mobile Sidebar */}
        <div 
          className={`sidebar-overlay ${isMobileSidebarOpen ? 'visible' : ''}`}
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      </div>
    </header>
  );
};

export default Header;