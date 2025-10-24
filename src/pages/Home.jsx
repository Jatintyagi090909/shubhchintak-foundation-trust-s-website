import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailService from '../services/emailService';
import ReCAPTCHA from 'react-google-recaptcha';

// Form validation schema for internship
const InternshipSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  domain: Yup.string()
    .required('Domain selection is required'),
});

const carouselSlides = [
  {
    img: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745613849/images/slide1_jgwnus.jpg',  //https://res.cloudinary.com/dygzdptij/image/upload/v1745613849/images/slide1_jgwnus.jpg
    alt: 'community',
    title: 'Join our community',
    desc: '',
  },
  {
    img: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745613862/images/slide2_lr0a9q.png',
    alt: 'warrior',
    title: 'Become a warrior',
    desc: '',
  },
  {
    img: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745613830/images/slide3_b5ru7w.png', //https://res.cloudinary.com/dygzdptij/image/upload/v1745613830/images/slide3_b5ru7w.png
    alt: 'welcome',
    title: 'welcome',
    desc: '',
  },
];

const Home = () => {
  // State for internship form modal
  const [showInternshipModal, setShowInternshipModal] = useState(false);
  const [internshipSubmitted, setInternshipSubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // Carousel rotation interval in milliseconds (3000ms = 3 seconds)
  const carouselInterval = 5000;

  // Add meta viewport tag to fix scaling issues on mobile
  useEffect(() => {
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

    if (!document.getElementById('responsive-fix-css')) {
      const style = document.createElement('style');
      style.id = 'responsive-fix-css';
      style.innerHTML = `
        body {
          overflow-x: hidden;
          width: 100%;
          box-sizing: border-box;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .container {
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
        }
        @media (max-width: 767px) {
          .carousel-item img {
            height: auto !important;
            max-height: 300px !important;
          }
          .carousel-caption {
            display: block !important;
            position: relative;
            background: taransparent;
            padding: 10px;
            left: 0;
            right: 0;
            bottom: 0;
            font-size: 0.9rem;
          }
          .focus-area-stat, .focus-area-quote {
            width: 100% !important;
            max-width: 100% !important;
          }
          .mr-2 {
            margin-right: 0.5rem !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    // Responsive styles for focus areas
    if (!document.getElementById('focus-areas-responsive-css')) {
      const style = document.createElement('style');
      style.id = 'focus-areas-responsive-css';
      style.innerHTML = `
        @media (max-width: 991.98px) {
          .focus-area-title h3 {
            font-size: 1.2rem !important;
          }
        }
        @media (max-width: 767.98px) {
          .focus-areas .row > [class*='col-'] {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .focus-area-title h3 {
            font-size: 1.1rem !important;
            padding-bottom: 7px !important;
          }
          .focus-area-stat, .focus-area-quote {
            max-width: 100% !important;
            margin-bottom: 16px;
          }
          .focus-areas img {
            aspect-ratio: 16/9 !important;
            height: auto !important;
            object-fit: cover;
            margin-bottom: 8px;
          }
          .focus-areas .row > .col-6,
          .focus-areas .row > .col-md-6,
          .focus-areas .row > .col-lg-6 {
            margin-bottom: 8px;
          }
        }
        @media (max-width: 575.98px) {
          .focus-areas .row > [class*='col-'] {
            padding-right: 0;
            padding-left: 0;
          }
          .focus-areas img {
            aspect-ratio: 16/9 !important;
            height: auto !important;
            object-fit: cover;
          }
        }
      `;
      document.head.appendChild(style);
    }
    // Responsive styles for portfolio cards and CTA
    if (!document.getElementById('portfolio-cta-responsive-css')) {
      const style = document.createElement('style');
      style.id = 'portfolio-cta-responsive-css';
      style.innerHTML = `
        @media (max-width: 991.98px) {
          .portfolio .section-title h2 {
            font-size: 1.2rem !important;
          }
        }
        @media (max-width: 767.98px) {
          .portfolio .card {
            margin-bottom: 1.2rem !important;
          }
          .portfolio .card-img-top {
            aspect-ratio: 16/9 !important;
            height: auto !important;
            object-fit: cover !important;
          }
          .portfolio .btn {
            font-size: 1rem !important;
            padding: 0.5rem 0.75rem !important;
          }
          .portfolio .row > .col-lg-4,
          .portfolio .row > .col-md-6,
          .portfolio .row > .col-sm-12 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .cta h3 {
            font-size: 1.2rem !important;
          }
          .cta p {
            font-size: 1rem !important;
          }
          .cta .btn {
            font-size: 1rem !important;
            padding: 0.65rem 1.3rem !important;
          }
        }
        @media (max-width: 575.98px) {
          .portfolio .card-body {
            padding: 0.75rem !important;
          }
          .cta h3 {
            font-size: 1.1rem !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    // Responsive styles for internship modal
    if (!document.getElementById('internship-modal-responsive-css')) {
      const style = document.createElement('style');
      style.id = 'internship-modal-responsive-css';
      style.innerHTML = `
        @media (max-width: 600px) {
          .scf-modal-content {
            max-width: 98vw !important;
            width: 98vw !important;
            min-width: unset !important;
            padding: 0 !important;
            border-radius: 8px !important;
          }
          .scf-modal-header {
            padding: 14px 10px !important;
            font-size: 1rem !important;
          }
          .scf-modal-body {
            padding: 12px !important;
          }
          .scf-modal-form label {
            font-size: 1rem !important;
          }
          .scf-modal-form .form-control {
            font-size: 1rem !important;
          }
          .scf-modal-form .btn {
            font-size: 1rem !important;
            padding: 0.6rem 1.2rem !important;
          }
          .scf-modal-form .d-flex {
            flex-direction: column !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 400px) {
          .scf-modal-content {
            max-width: 100vw !important;
            width: 100vw !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Add useEffect for auto-rotating carousel slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % carouselSlides.length);
    }, carouselInterval);
    return () => clearInterval(slideTimer);
  }, []);

  // Sample recent works data with categories - arranged in requested order
  const recentWorks = [
    { id: 1, title: 'Blanket Distribution', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612138/images/blanket1_tzyaoh.jpg', category: 'blanket' },
    { id: 2, title: 'Ration Distribution', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612459/images/ration1_lg3mjb.jpg', category: 'ration' },
    { id: 3, title: 'Environmental Day', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612144/images/enviroment1_ftubz0.jpg', category: 'environment' },
    { id: 4, title: 'Teachers Day', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612531/images/teacherday1_zmsr1b.jpg', category: 'education' },
    { id: 5, title: 'Sports Day', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612520/images/sportsday1_lisirz.jpg', category: 'sports' },
    { id: 6, title: 'Latest News', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612443/images/news1_rvcb2a.jpg', category: 'news' },
  ];

  // Add CSS for animations
  useEffect(() => {
    if (!document.getElementById('carousel-animations-css')) {
      const style = document.createElement('style');
      style.id = 'carousel-animations-css';
      style.innerHTML = `
        .carousel-caption {
          opacity: 0;
          transition: all 0.5s ease;
        }
        .carousel-item.active .carousel-caption {
          opacity: 0;
        }
        .animated-element[data-aos="fade-down"] {
          opacity: 0;
          transform: translateY(-20px);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .animated-element[data-aos="fade-up"] {
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .carousel-item.active .animated-element[data-aos="fade-down"],
        .carousel-item.active .animated-element[data-aos="fade-up"] {
          opacity: 0;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Helper function to create the gallery link with filter
  const getGalleryFilterLink = (category) => {
    const link = `/gallery?filter=${category}`;
    return link;
  };

  // Handle "Get Involved" button click
  const handleGetInvolved = (e) => {
    e.preventDefault();
    setShowInternshipModal(true);
    setInternshipSubmitted(false);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowInternshipModal(false);
    if (internshipSubmitted) {
      setTimeout(() => {
        setInternshipSubmitted(false);
      }, 500);
    }
  };

  // Handle internship form submission using emailService
  const handleInternshipSubmit = async (values, { resetForm, setSubmitting }) => {
     if (!recaptchaToken) {
    alert("Please verify that you're not a robot.");
    setSubmitting(false);
    return;
  }
  console.log('Form submitted successfully!');
  console.log('Form values:', values);
  console.log('reCAPTCHA token:', recaptchaToken);

  // You can also reset the form or close modal here
  // e.g., setInternshipSubmitted(true); setTimeout(() => handleCloseModal(), 3000);

  

    try {
      await emailService.sendInternshipApplication(values);
      setInternshipSubmitted(true);
      resetForm();
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error('Failed to process internship application:', error);
      alert('There was an error processing your application. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  // Effect to handle body overflow when modal is open
  useEffect(() => {
    if (showInternshipModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showInternshipModal]);

  // Responsive carousel handlers for swipe (touch events)
  // Only on mobile
  useEffect(() => {
    let startX = null;
    let isTouching = false;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        isTouching = true;
      }
    };

    const handleTouchMove = (e) => {
      if (!isTouching || startX === null) return;
      const moveX = e.touches[0].clientX;
      const diff = startX - moveX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // swipe left, next slide
          setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
        } else {
          // swipe right, prev slide
          setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
        }
        isTouching = false;
        startX = null;
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      startX = null;
    };

    const carousel = document.getElementById('demo');
    if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
      carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('touchstart', handleTouchStart);
        carousel.removeEventListener('touchmove', handleTouchMove);
        carousel.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [carouselSlides.length]);

  

  return (
    <>
      {/* Carousel Banner */}
      <div
        id="demo"
        className="carousel slide"
        data-ride="carousel"
        data-interval={carouselInterval}
        data-bs-interval={carouselInterval}
        style={{
          width: '100%',
          margin: '0 auto',
          maxWidth: '1200px',
        }}
      >
        <ul className="carousel-indicators">
          {carouselSlides.map((slide, idx) => (
            <li
              key={idx}
              data-target="#demo"
              data-slide-to={idx}
              className={idx === activeSlide ? 'active' : ''}
              onClick={() => setActiveSlide(idx)}
              style={{ cursor: 'pointer' }}
              aria-label={`Go to slide ${idx + 1}`}
            ></li>
          ))}
        </ul>

        <div className="carousel-inner">
          {carouselSlides.map((slide, idx) => (
            <div
              className={`carousel-item${idx === activeSlide ? ' active' : ''}`}
              key={idx}
              style={{
                display: idx === activeSlide ? 'block' : 'none',
                width: '100%',
                textAlign: 'center',
                transition: 'opacity 0.0s',
              }}
            >
              <img
                src={slide.img}
                alt={slide.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  background: '#fff',
                  margin: '0 auto',
                  borderRadius: '0.5rem',
                }}
              />
             {/* <div
              className="carousel-caption"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '1.5rem 1rem',
                  background: 'taransparent',
                  color: 'black',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                  width: '100%',
                  maxWidth: '100%',
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              >
                <h5 className="animated-element" data-aos="fade-down" style={{ fontWeight: 700 }}>
                  {slide.title}
                </h5>
                <p className="animated-element" data-aos="fade-up">
                  {slide.desc}
                </p>
              </div>*/}
            </div>
          ))}
        </div>

        <a
          className="carousel-control-prev"
          href="#demo"
          data-slide="prev"
          onClick={(e) => {
            e.preventDefault();
            setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
          }}
          style={{
            cursor: 'pointer',
            width: '5%',
            minWidth: '30px',
            height: '100%',
            top: 0,
            left: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
          aria-label="Previous Slide"
        >
          <span className="carousel-control-prev-icon" style={{ backgroundColor: '#fd5c28', borderRadius: '50%' }}></span>
        </a>
        <a
          className="carousel-control-next"
          href="#demo"
          data-slide="next"
          onClick={(e) => {
            e.preventDefault();
            setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
          }}
          style={{
            cursor: 'pointer',
            width: '5%',
            minWidth: '30px',
            height: '100%',
            top: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
          aria-label="Next Slide"
        >
          <span className="carousel-control-next-icon" style={{ backgroundColor: '#fd5c28', borderRadius: '50%' }}></span>
        </a>
      </div>

      {/* About Us Section */}
      <FadeInSection>
        <section id="about" className="about py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 data-aos="fade-up">About <strong className="text-primary">Shubhchintak Foundation Trust</strong></h2>
                <p data-aos="fade-up" data-aos-delay="100">
                  Shubhchintak Foundation Trust is a non-government organization dedicated to making lives better by providing
                  food, education, and essential supplies to the needful across India.
                  The Shubhchintak Team comprises of people from different walks of life who have all come together with their varied experiences to work towards one mission.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Our Focus Areas */}
      <FadeInSection>
        <section id="focus-areas" className="focus-areas py-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-3">
                <h2 data-aos="fade-up" style={{ color: '#8b0000' }}>Our areas of focus</h2>
              </div>
            </div>

            {/* Education */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="focus-area-title" data-aos="fade-right">
                  <h3 style={{ color: '#e94e1b', borderBottom: '1px solid #e94e1b', paddingBottom: '10px', fontSize: 'calc(1.3rem + 0.6vw)' }}>
                    <i className="fas fa-book-open mr-2"></i> Education & Skill Development
                  </h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-12" data-aos="fade-right">
                <p className="mb-4" style={{ fontSize: 'calc(0.9rem + 0.2vw)' }}>
                At Shubhchintak Foundation Trust, we believe that education is the most powerful tool for transforming lives. Our focus is to provide access to quality education for underprivileged children who might otherwise be deprived of basic learning opportunities.
We organize free educational programs, distribute study materials, and support schools in rural and underserved areas.
Beyond academics, we run skill development workshops—teaching practical skills such as computer literacy, tailoring, handicrafts, and spoken English—to empower youth and adults to become self-reliant and career-ready.
Our vision is to bridge the gap between potential and opportunity, helping individuals unlock a brighter future through education and continuous learning.
                </p>
                <div className="focus-area-quote" style={{
                  backgroundColor: '#FFE4E1',
                  padding: '15px',
                  borderRadius: '8px',
                  width: '100%',
                  position: 'relative',
                  marginBottom: '20px'
                }}>
                  <i className="fas fa-quote-left" style={{ fontSize: '2rem', color: '#e94e1b', opacity: '0.3', position: 'absolute', top: '10px', left: '10px' }}></i>
                  <p style={{ fontSize: 'calc(0.8rem + 0.1vw)',color: '#e94e1b',fontStyle:'italic', marginLeft: '30px', marginTop: '15px' }}>
                  "Unlocking potential through knowledge, building a future of opportunity and hope."
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-12" data-aos="fade-left">
                <div className="row">
                  <div className="col-6 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764613/images/education1_aijqpt.jpg" className="img-fluid rounded shadow-sm" alt="Education initiatives" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }} />
                  </div>
                  <div className="col-6 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764615/images/education2_lwt6ay.jpg" className="img-fluid rounded shadow-sm" alt="Children in classroom" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }} />
                  </div>
                  <div className="col-12">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764612/images/education4_wueu9j.jpg" className="img-fluid rounded shadow-sm" alt="Student studying" style={{ width: '100%', height: 'auto', objectFit: 'contain', aspectRatio: '16/9' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* environment */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="focus-area-title" data-aos="fade-right">
                  <h3 style={{ color: '#7ab51d', borderBottom: '1px solid #7ab51d', paddingBottom: '10px', fontSize: 'calc(1.3rem + 0.6vw)' }}>
                    <i className="fas fa-seedling mr-2"></i> Environment & Sustainability
                  </h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 order-lg-2" data-aos="fade-left">
                <p className="mb-4" style={{ fontSize: 'calc(0.9rem + 0.2vw)' }}>
                A healthy environment is essential for a healthy community. At Shubhchintak Foundation Trust, we are committed to protecting and preserving nature for future generations.
We actively engage in tree plantation drives, clean-up campaigns, and awareness programs focused on climate change, waste management, and water conservation.
Our initiatives encourage people, especially young minds, to adopt eco-friendly habits like reducing plastic use, promoting recycling, and conserving natural resources.
By collaborating with schools, local communities, and authorities, we aim to create sustainable green spaces and inspire a culture of environmental responsibility.
We believe that small, consistent actions can lead to a big, positive impact on our planet.
                </p>
                <div className="focus-area-quote" style={{
                  backgroundColor: '#f6f9f0',
                  padding: '15px',
                  borderRadius: '8px',
                  width: '100%',
                  position: 'relative',
                  marginBottom: '20px'
                }}>
                  <i className="fas fa-quote-left" style={{ fontSize: '2rem', color: '#7ab51d', opacity: '0.3', position: 'absolute', top: '10px', left: '10px' }}></i>
                  <p style={{ fontSize: 'calc(0.8rem + 0.1vw)', marginLeft: '30px', marginTop: '15px', fontStyle: 'italic', color: '#7ab51d' }}>
                  "Nurturing nature today to secure a greener, healthier tomorrow."
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 order-lg-1" data-aos="fade-right">
                <div className="row">
                  <div className="col-12 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745765163/images/envi3_rl20jl.jpg" className="img-fluid rounded shadow-sm" alt="Livelihood initiative" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '16/9' }} />
                  </div>
                  <div className="col-6 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764696/images/envi1_ztdudw.jpg" className="img-fluid rounded shadow-sm" alt="Farming initiative" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }} />
                  </div>
                  <div className="col-6 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764694/images/envi2_skqnyy.jpg" className="img-fluid rounded shadow-sm" alt="Skill training" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Relief Support for the Needy */}
            <div className="row">
              <div className="col-12">
                <div className="focus-area-title" data-aos="fade-right">
                  <h3 style={{ color: '#c43b8e', borderBottom: '1px solid #c43b8e', paddingBottom: '10px', fontSize: 'calc(1.3rem + 0.6vw)' }}>
                    <i className="fas fa-people-carry mr-2"></i> Relief Support for the Needy
                  </h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-12" data-aos="fade-right">
                <p className="mb-4" style={{ fontSize: 'calc(0.9rem + 0.2vw)' }}>
                At Shubhchintak Foundation Trust, we stand by those facing tough times.
Through our ration kit distribution drives, we provide essential food supplies to families struggling with poverty, especially during crises like pandemics or natural disasters.
In colder months, we organize blanket distribution campaigns to help homeless and economically disadvantaged individuals stay warm and safe.
Our relief efforts aim to meet the basic needs of the most vulnerable sections of society, bringing them comfort, dignity, and hope in their most challenging moments.
We believe that no one should sleep hungry or suffer due to lack of basic necessities.
                </p>
                <div className="focus-area-quote" style={{
                  backgroundColor: '#fdf6fa',
                  padding: '15px',
                  borderRadius: '8px',
                  width: '100%',
                  position: 'relative',
                  marginBottom: '20px'
                }}>
                  <i className="fas fa-quote-left" style={{ fontSize: '2rem', color: '#c43b8e', opacity: '0.3', position: 'absolute', top: '10px', left: '10px' }}></i>
                  <p style={{ fontSize: 'calc(0.8rem + 0.1vw)', marginLeft: '30px', marginTop: '15px', fontStyle: 'italic', color: '#c43b8e' }}>
                  "Extending a hand of compassion, delivering hope with every kit and blanket."
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-12" data-aos="fade-left">
                <div className="row">
                  <div className="col-12 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764845/images/s1_f5568x.jpg" className="img-fluid rounded shadow-sm" alt="Women empowerment" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '16/9' }} />
                  </div>
                  <div className="col-6 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764845/images/s2_brwkq8.jpg" className="img-fluid rounded shadow-sm" alt="Gender equality initiative" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }} />
                  </div>
                  <div className="col-6 mb-3">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764844/images/s3_habeff.jpg" className="img-fluid rounded shadow-sm" alt="Women's gathering" style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Recent Works */}
      <FadeInSection>
        <section id="portfolio" className="portfolio section-bg py-5">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2 style={{ fontSize: 'calc(1.5rem + 0.9vw)' }}><strong>Some of our recent works</strong></h2>
            </div>

            <div className="row portfolio-container" data-aos="fade-up">
              {recentWorks.map((work, index) => (
                <div key={work.id} className="col-lg-4 col-md-6 col-sm-12 portfolio-item mb-4" data-aos="zoom-out" data-aos-delay={index * 100}>
                  <div className="card h-100 shadow-sm zoom-effect">
                    <img
                      src={work.image}
                      className="card-img-top"
                      alt={work.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '16/9',
                        objectFit: 'cover'
                      }}
                    />
                    <div className="card-body text-center">
                      <Link
                        to={getGalleryFilterLink(work.category)}
                        className="btn btn-info w-100"
                        data-category={work.category}
                        style={{
                          padding: '0.5rem 0.75rem',
                          fontSize: 'calc(0.875rem + 0.1vw)',
                          whiteSpace: 'normal',
                          wordWrap: 'break-word'
                        }}
                      >
                        {work.title}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4" data-aos="zoom-in">
              <Link
                to="/gallery"
                className="btn animated-element"
                style={{
                  backgroundColor: '#fd5c28',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  fontWeight: '600',
                  borderRadius: '30px',
                  boxShadow: '0 3px 10px rgba(253, 92, 40, 0.3)',
                  fontSize: 'calc(0.9rem + 0.1vw)'
                }}
              >
                See More
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Call to Action Section */}
      <FadeInSection>
        <section
          id="cta"
          className="cta py-5"
          style={{
            backgroundColor: '#fd5c28',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("") center/cover no-repeat',
              opacity: 0.1,
              zIndex: 0
            }}
          ></div>
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-12" data-aos="zoom-in" style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'calc(1.5rem + 0.9vw)', fontWeight: '700', marginBottom: '1rem' }}>INTERNSHIP OPPORTUNITY</h3>
                <p style={{ fontSize: 'calc(1rem + 0.1vw)', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
                  The Shubhchintak Foundation Trust, a Pune-based non-government organization dedicated to social services and human welfare, is now offering internship opportunities in various fields.
                </p>
                <button
                  onClick={handleGetInvolved}
                  className="btn btn-outline-light btn-lg animated-element"
                  style={{
                    padding: '0.75rem 2rem',
                    fontWeight: '600',
                    borderRadius: '30px',
                    fontSize: 'calc(0.9rem + 0.1vw)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="fa fa-edit mr-2"></i> Apply
                </button>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Internship Application Modal */}
      {showInternshipModal && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
            padding: '15px'
          }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-content scf-modal-content"
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '500px',
              minWidth: '320px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="modal-header scf-modal-header"
              style={{
                padding: '15px 20px',
                borderBottom: '1px solid #e3e3e3',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fd5c28',
                color: 'white',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
              }}
            >
              <h5 style={{ margin: 0, fontWeight: '600', fontSize: 'calc(1.1rem + 0.3vw)' }}>
                Apply for Internship
              </h5>
              <button
                onClick={handleCloseModal}
                aria-label="Close modal"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'white',
                  padding: '0 8px',
                  lineHeight: 1,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body scf-modal-body" style={{ padding: '20px' }}>
              {internshipSubmitted ? (
                <div className="text-center">
                  <div style={{ color: '#28a745', fontSize: '3rem', marginBottom: '15px' }}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h4 style={{ color: '#333', marginBottom: '15px', fontSize: 'calc(1.1rem + 0.3vw)' }}>Application Submitted!</h4>
                  <p style={{ marginBottom: '20px', fontSize: 'calc(0.9rem + 0.1vw)' }}>
                    Thank you for applying for an internship with us. We will review your application and get back to you soon.
                  </p>
                  <p>
                    <small>This window will close automatically...</small>
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-3" style={{ fontSize: 'calc(0.9rem + 0.1vw)' }}>
                    Please fill out the form below to registered for an internship with us. All fields are required.
                  </p>

                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      phone: '',
                      domain: '',
                      message: ''
                    }}
                    validationSchema={InternshipSchema}
                    onSubmit={handleInternshipSubmit}
                  >
                    
                    {({ isSubmitting, errors, touched }) => (
                      <Form className="scf-modal-form">
                        <div className="form-group mb-3">
                          <label htmlFor="name" style={{ fontSize: 'calc(0.9rem + 0.1vw)', fontWeight: '500', marginBottom: '0.25rem' }}>Full Name</label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                            placeholder="Enter your full name"
                            autoComplete="off"
                          />
                          <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="email" style={{ fontSize: 'calc(0.9rem + 0.1vw)', fontWeight: '500', marginBottom: '0.25rem' }}>Email Address</label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                            placeholder="Enter your email"
                            autoComplete="off"
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="phone" style={{ fontSize: 'calc(0.9rem + 0.1vw)', fontWeight: '500', marginBottom: '0.25rem' }}>Phone Number</label>
                          <Field
                            type="text"
                            id="phone"
                            name="phone"
                            className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                            placeholder="Enter your 10-digit phone number"
                            autoComplete="off"
                          />
                          <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="domain" style={{ fontSize: 'calc(0.9rem + 0.1vw)', fontWeight: '500', marginBottom: '0.25rem' }}>Select Domain</label>
                          <Field
                            as="select"
                            id="domain"
                            name="domain"
                            className={`form-control ${errors.domain && touched.domain ? 'is-invalid' : ''}`}
                          >
                            <option value="">Select a domain</option>
                            <option value="fullstack">Full Stack Developer</option>
                            <option value="mobile">Mobile Application Developer</option>
                            <option value="aiml">AI/ML Engineer</option>
                            <option value="design">UI/UX Designer</option>
                            <option value="content">Content Writer</option>
                          </Field>
                          <ErrorMessage name="domain" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="message" style={{ fontSize: 'calc(0.9rem + 0.1vw)', fontWeight: '500', marginBottom: '0.25rem' }}>Additional Information (Optional)</label>
                          <Field
                            as="textarea"
                            id="message"
                            name="message"
                            rows="3"
                            className="form-control"
                            placeholder="Tell us about your skills, experience, or any other relevant information"
                          />
                        </div>
                         <div className="form-group mb-3">
  <ReCAPTCHA
    sitekey="6Lf-pGgrAAAAADUvXNmmiTpvRXGSifcGJ1QVVpIR" // Replace with your actual site key
    onChange={(token) => setRecaptchaToken(token)}
  />
</div>

                        <div className="d-flex justify-content-between flex-wrap">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCloseModal}
                            disabled={isSubmitting}
                            style={{ marginBottom: '10px' }}
                          >
                            Cancel
                          </button>
                         
                          <button
                            type="submit"
                            className="btn"
                            disabled={isSubmitting}
                            style={{
                              backgroundColor: '#fd5c28',
                              color: 'white',
                              marginBottom: '10px',
                              minWidth: '150px'
                            }}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Submitting...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-paper-plane mr-2"></i>
                                Submit Application
                              </>
                            )}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
