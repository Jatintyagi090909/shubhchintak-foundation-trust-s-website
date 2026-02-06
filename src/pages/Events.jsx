import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailService from '../services/emailService';
import ReCAPTCHA from 'react-google-recaptcha';


// Form validation schema
const EnrollmentSchema = Yup.object().shape({
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
  selectedCourse: Yup.string()
    .required('Selected course is required'),
});

const Events = () => {
  const allEvents = [
    {
      id: 1,
      title: 'PYTHON',
      date: 'MAY 01, 2025',
      dateObj: new Date('MAY 01, 2025'), // Added date object for sorting
      price: 1000,
      location: 'Virtual',
      image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745647088/images/python_gsf3pf.png',
      description: 'Learn python',
      category: 'PYTHON',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'FULL STACK DEVELOPMENT',
      date: 'JANUARY 15, 2025',
      dateObj: new Date('January 15, 2025'), // Added date object for sorting
      price: 1500,
      location: 'Virtual',
      image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745647088/images/fullstack_cn4fvx.png',
      description: 'Learn Web-Development',
      category: 'FULL STACK DEVELOPMENT',
      status: 'Ongoing'
    },
    {
      id: 3,
      title: 'JAVA',
      date: 'JANUARY 01, 2025',
      dateObj: new Date('JANUARY 01, 2025'), // Added date object for sorting
      price: 1000,
      location: 'Virtual',
      image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745647088/images/java_elwnpd.png',
      description: 'Learn Java',
      category: 'JAVA',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'SINGING COMPETITION',
      date: 'JANUARY 30, 2025',
      dateObj: new Date('January 30, 2025'), // Added date object for sorting
      price: 250,
      location: 'PUNE',
      image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612408/images/event2_j0c6qu.jpg',
      description: 'competition',
      category: 'SINGING COMPETITION',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'SPORTS COMPETITION',
      date: 'August 29, 2024',
      dateObj: new Date('August 29, 2024'), // Added date object for sorting
      price: 300,
      location: 'PUNE',
      image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612441/images/event3_un8ym7.png',
      description: 'Organizing sports activities for underprivileged children.',
      category: 'Sports',
      status: 'Completed'
    }
  ];

  // Define status filters
  const statusFilters = ['All', 'Upcoming', 'Ongoing', 'Completed'];

  // State for storing filtered events
  const [events, setEvents] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Ongoing');  // Default to Ongoing
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [enrollmentSubmitted, setEnrollmentSubmitted] = useState(false);
  const [eventList, setEventList] = useState(allEvents);// State to track changes to events
  const [recaptchaToken, setRecaptchaToken] = useState(null);  // State to track changes to events

  // Function to sort events by date (newest first)
  const sortEventsByDate = (events) => {
    return [...events].sort((a, b) => b.dateObj - a.dateObj);
  };

  // Initialize EmailJS and apply default filter
  useEffect(() => {
    emailService.init();
    // Apply default filter (Ongoing) and sort by date
    const filteredEvents = allEvents.filter(event => event.status === 'Ongoing');
    setEvents(sortEventsByDate(filteredEvents));
    setEventList(sortEventsByDate(allEvents));
  }, []);

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      // If search is cleared, respect the current status filter
      handleFilterClick(activeFilter);
      setSearchResults(null);
      return;
    }

    const filteredEvents = eventList.filter(event => {
      const searchText = searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchText) ||
        event.description.toLowerCase().includes(searchText) ||
        event.date.toLowerCase().includes(searchText) ||
        (event.location && event.location.toLowerCase().includes(searchText)) ||
        (event.price && event.price.toString().includes(searchText))
      );
    });

    // Apply status filter to search results if not "All"
    const finalEvents = activeFilter !== 'All'
      ? filteredEvents.filter(event => event.status === activeFilter)
      : filteredEvents;

    // Sort events by date
    const sortedEvents = sortEventsByDate(finalEvents);
    setEvents(sortedEvents);

    setSearchResults({
      term: searchTerm,
      count: finalEvents.length
    });
  };

  // Handle filter click
  const handleFilterClick = (status) => {
    setActiveFilter(status);

    const filteredEvents = status === 'All'
      ? eventList
      : eventList.filter(event => event.status === status);

    // Sort events by date
    const sortedEvents = sortEventsByDate(filteredEvents);
    setEvents(sortedEvents);

    // Update search results if there's an active search
    if (searchResults) {
      handleSearch(searchResults.term);
    }
  };

  // Helper to determine admin controls based on event status
  // For developer use only (not visible in UI)
  // Usage examples:
  // - To move an event from Upcoming to Ongoing: changeEventStatus(eventId, 'Ongoing')
  // - To move an event from Ongoing to Completed: changeEventStatus(eventId, 'Completed')
  // Where eventId is the id of the event you want to update (e.g., 1, 2, 3, etc.)
  const changeEventStatus = (eventId, newStatus) => {
    const updatedEvents = eventList.map(event => {
      if (event.id === eventId) {
        return { ...event, status: newStatus };
      }
      return event;
    });

    // Sort the updated events by date
    const sortedEvents = sortEventsByDate(updatedEvents);
    setEventList(sortedEvents);

    // Re-apply current filter to update the view
    const filteredEvents = activeFilter === 'All'
      ? sortedEvents
      : sortedEvents.filter(event => event.status === activeFilter);

    setEvents(filteredEvents);
  };

  // Handle enroll button click
  const handleEnroll = (event) => {
    setSelectedEvent(event);
    setShowEnrollModal(true);
    setEnrollmentSubmitted(false);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowEnrollModal(false);
    // Reset the form after some time if enrollment was successful
    if (enrollmentSubmitted) {
      setTimeout(() => {
        setEnrollmentSubmitted(false);
      }, 500);
    }
  };

  // Handle enrollment form submission using emailService
  const handleEnrollmentSubmit = async (values, { resetForm, setSubmitting }) => {
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
      // Log form values
      console.log('Enrollment form submitted:', values);
      console.log('For event:', selectedEvent?.title);

      // Send enrollment emails
      await emailService.sendEventEnrollment(values, selectedEvent);

      // Update UI to show success
      setEnrollmentSubmitted(true);
      resetForm();

      // Close modal after 2 seconds
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error('Failed to process enrollment:', error);
      alert('There was an error processing your enrollment. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  // Effect to handle body overflow when modal is open
  useEffect(() => {
    if (showEnrollModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEnrollModal]);

  
  const formatPrice = (price) => {
    if (price === undefined || price === null) return '';
    return `${price}`; // 
  };

  return (
    <>
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Events</h2>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>Events</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="events" className="events section-bg">
        <div className="container">
          <div className="section-title text-center mb-4" data-aos="fade-up">
            <h2><strong>Our Events</strong></h2>
            <p>Explore the various initiatives and events organized by Shubhchintak Foundation Trust</p>
          </div>

          <div className="row mb-4" data-aos="fade-up">
            <div className="col-md-8 offset-md-2">
              <SearchBar
                placeholder="Search events by title, location, or date..."
                onSearch={handleSearch}
              />

              {searchResults && (
                <div className="search-results mt-2 text-center">
                  {searchResults.count > 0 ? (
                    <p>Found {searchResults.count} result{searchResults.count !== 1 ? 's' : ''} for "{searchResults.term}"</p>
                  ) : (
                    <p>No events found for "{searchResults.term}"</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="row justify-content-center mb-4" data-aos="fade-up">
            <div className="col-12 text-center">
              <div className="filter-buttons">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterClick(status)}
                    className={`btn filter-btn mx-1 my-1 ${activeFilter === status ? 'active' : ''}`}
                    style={{
                      backgroundColor: activeFilter === status ? '#fd5c28' : '#f8f9fa',
                      color: activeFilter === status ? 'white' : '#333',
                      borderRadius: '30px',
                      padding: '8px 20px',
                      border: '1px solid #ddd',
                      transition: 'all 0.3s ease',
                      fontWeight: '500'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
                  <div className="card h-100 shadow">
                    <div className="position-relative">
                      <img
                        src={event.image}
                        className="card-img-top"
                        alt={event.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <span
                        className="position-absolute badge"
                        style={{
                          top: '10px',
                          right: '10px',
                          backgroundColor:
                            event.status === 'Upcoming' ? '#0d6efd' :
                            event.status === 'Ongoing' ? '#FF0000' :
                            '#28a745',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '4px'
                        }}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">{event.title}</h5>
                      <p className="card-text">{event.description}</p>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <i className="fas fa-calendar-alt mr-1"></i> {event.date}
                        </small>
                        {event.status !== 'Completed' ? (
                          <small
                            style={{
                              color: '#fd5c28',
                              fontWeight: '600',
                              border: '1px solid #fd5c28',
                              borderRadius: '4px',
                              padding: '2px 8px',
                              display: 'inline-flex',
                              alignItems: 'center'
                            }}
                          >
                            <i className="fas fa-rupee-sign mr-1"></i> {formatPrice(event.price)}
                          </small>
                        ) : (
                          <small
                            style={{
                              color: '#28a745',
                              fontWeight: '600',
                              border: '1px solid #28a745',
                              borderRadius: '4px',
                              padding: '2px 8px',
                              display: 'inline-flex',
                              alignItems: 'center'
                            }}
                          >
                            <i className="fas fa-map-marker-alt mr-1"></i> {event.location}
                          </small>
                        )}
                      </div>

                      {event.status !== 'Completed' && (
                        <button
                          className="btn btn-block"
                          onClick={() => handleEnroll(event)}
                          style={{
                            backgroundColor: '#fd5c28',
                            color: 'white',
                            fontWeight: '500',
                            borderRadius: '4px',
                            padding: '8px 15px',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className="fas fa-user-plus mr-2"></i>
                          Register Now
                        </button>
                      )}

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h4>No events found. Try a different search term or filter.</h4>
                <button
                  className="btn mt-3"
                  onClick={() => {
                    handleFilterClick('All');
                    setSearchResults(null);
                  }}
                  style={{ backgroundColor: '#fd5c28', color: 'white' }}
                >
                  Show All Events
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <p>For more information about our events or to participate, please <Link to="/contact" style={{ color: '#fd5c28' }}>contact us</Link>.</p>
          </div>
        </div>
      </section>

      {showEnrollModal && (
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
            padding: '20px'
          }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="modal-header"
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
              <h5 style={{ margin: 0, fontWeight: '600' }}>
                Join {selectedEvent?.title}
              </h5>
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'white',
                  padding: 0,
                  lineHeight: 1
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body" style={{ padding: '20px' }}>
              {enrollmentSubmitted ? (
                <div className="text-center">
                  <div style={{ color: '#28a745', fontSize: '3rem', marginBottom: '15px' }}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h4 style={{ color: '#333', marginBottom: '15px' }}>Registration Successful!</h4>
                  <p style={{ marginBottom: '20px' }}>
                    Thank you for registering for {selectedEvent?.title}. We will contact you soon with more details.
                  </p>
                  <p>
                    <small>This window will close automatically...</small>
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-3">
                    Please fill out the form below to join this event. All fields are required.
                  </p>

                  <div className="event-details mb-4" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
                    <div className="d-flex align-items-center mb-2">
                      <div style={{
                        minWidth: '30px',
                        color: '#fd5c28',
                        textAlign: 'center'
                      }}>
                        <i className="fas fa-calendar-day"></i>
                      </div>
                      <div className="ml-2">
                        <strong>Date:</strong> {selectedEvent?.date}
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div style={{
                        minWidth: '30px',
                        color: '#fd5c28',
                        textAlign: 'center'
                      }}>
                        <i className="fas fa-rupee-sign"></i>
                      </div>
                      <div className="ml-2">
                        <strong>Price:</strong> <span style={{ color: '#fd5c28', fontWeight: '600' }}>₹ {formatPrice(selectedEvent?.price)}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div style={{
                        minWidth: '30px',
                        color: '#fd5c28',
                        textAlign: 'center'
                      }}>
                        <i className="fas fa-tag"></i>
                      </div>
                      <div className="ml-2">
                        <strong>Category:</strong> {selectedEvent?.category}
                      </div>
                    </div>
                  </div>

                  <Formik
                    enableReinitialize
                    initialValues={{
                      name: '',
                      email: '',
                      phone: '',
                      selectedCourse: selectedEvent ? selectedEvent.title : '',
                      notes: ''
                    }}
                    validationSchema={EnrollmentSchema}
                    onSubmit={handleEnrollmentSubmit}
                  >
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="form-group mb-3">
                          <label htmlFor="name">Full Name</label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                            placeholder="Enter your full name"
                          />
                          <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="email">Email Address</label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                            placeholder="Enter your email"
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="phone">Phone Number</label>
                          <Field
                            type="text"
                            id="phone"
                            name="phone"
                            className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                            placeholder="Enter your 10-digit phone number"
                          />
                          <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="selectedCourse">Selected Event</label>
                          <Field
                            type="text"
                            id="selectedCourse"
                            name="selectedCourse"
                            className={`form-control ${errors.selectedCourse && touched.selectedCourse ? 'is-invalid' : ''}`}
                            value={selectedEvent ? selectedEvent.title : ''}
                            readOnly
                          />
                          <ErrorMessage name="selectedCourse" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="notes">Additional Notes (Optional)</label>
                          <Field
                            as="textarea"
                            id="notes"
                            name="notes"
                            rows="2"
                            className="form-control"
                            placeholder="Any special requests or information"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <ReCAPTCHA
                            sitekey="6Lf-pGgrAAAAADUvXNmmiTpvRXGSifcGJ1QVVpIR" // Replace with your actual site key
                            onChange={(token) => setRecaptchaToken(token)}
                          />
                        </div>

                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-secondary mr-2"
                            onClick={handleCloseModal}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn"
                            disabled={isSubmitting}
                            style={{
                              backgroundColor: '#fd5c28',
                              color: 'white'
                            }}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Submitting...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-check-circle mr-2"></i>
                                Submit Registration
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

export default Events;
