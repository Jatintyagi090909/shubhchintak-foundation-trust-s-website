import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FadeInSection from '../components/FadeInSection';
import { useLoading } from '../context/LoadingContext';
import emailService from '../services/emailService';
import ReCAPTCHA from 'react-google-recaptcha';

// Form validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  subject: Yup.string()
    .min(4, 'Subject is too short')
    .max(100, 'Subject is too long')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .max(500, 'Message is too long')
    .required('Message is required'),
});


const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // Initialize Email Service
  useEffect(() => {
    
    emailService.init();
  }, []);

  // Submit form and send emails via Email Service
  const submitForm = async (values, { resetForm, setSubmitting }) => {
    if (!recaptchaToken) {
    alert("Please verify that you're not a robot.");
    setFormSubmitted(false);
    return;
  }

  // Proceed with submission
  console.log("Submitted values:", values);
  console.log("reCAPTCHA token:", recaptchaToken);
    showLoading();
    setSubmissionError(null);
    if (!recaptchaToken) {
    alert("Please verify that you're not a robot.");
    setFormSubmitted(false);
    return;
  }

  // Proceed with submission
  console.log("Submitted values:", values);
  console.log("reCAPTCHA token:", recaptchaToken);

    try {
      // Send emails using the email service abstraction
      await emailService.sendContactForm(values);

      // Log form values
      console.log('Form submitted successfully:', values);

      // Set submission success
      setFormSubmitted(true);
      resetForm();

      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      // Handle errors
      console.error('Email submission error:', error);
      setSubmissionError(
        'There was an error sending your message. Please try again or contact us directly via phone.'
      );
    } finally {
      hideLoading();
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Contact</h2>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>Contact</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Map Section - Moved here */}
      <FadeInSection>
        <section className="map-section mt-3 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-12" data-aos="fade-up">
                <div className="map-container" style={{ height: '400px', width: '100%' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7566.706732582234!2d73.929879!3d18.512927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1f35a79cd51%3A0xa5c84042e42a8756!2sShubhchintak%20Foundation%20Trust!5e0!3m2!1sen!2sin!4v1745348800075!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Pune Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <FadeInSection>
            <div className="row justify-content-center" data-aos="fade-up">
              <div className="col-lg-10">
                <div className="info-wrap">
                  <div className="row">
                    <div className="col-lg-4 info">
                      <i className="fas fa-map-marker-alt"></i>
                      <h4>Location:</h4>
                      <p>
                        Pune - 411013<br />
                        India
                      </p>
                    </div>

                    <div className="col-lg-4 info mt-4 mt-lg-0">
                      <i className="fas fa-envelope"></i>
                      <h4>Email:</h4>
                      <p>
                        <a
                          href="mailto:admin@shubhchintaktrust.com"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                          className="email-link"
                        >
                          admin@shubhchintaktrust.com
                        </a>
                      </p>
                    </div>

                    <div className="col-lg-4 info mt-4 mt-lg-0">
                      <i className="fas fa-phone"></i>
                      <h4>Call:</h4>
                      <p>
                        <a
                          href="tel:+917385509098"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                          className="phone-link"
                        >
                          +91-7385509098
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="row mt-5 justify-content-center" data-aos="fade-up">
              <div className="col-lg-10">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  }}
                  validationSchema={ContactSchema}
                  onSubmit={submitForm}
                >
                  {({ isSubmitting, isValid, dirty, resetForm }) => (
                    <Form className="php-email-form" style={{ maxWidth: '700px', margin: '0 auto' }}>
                      <h3 className="text-center mb-4" style={{ letterSpacing: '2px', fontWeight: '600', color: '#343a40' }}>
                        Get in touch with us:
                      </h3>

                      <div className="form-row">
                        <div className="col-md-6 form-group mb-3">
                          <Field
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Your Name"
                            style={{ borderRadius: '4px', borderColor: '#ced4da', padding: '10px' }}
                          />
                          <ErrorMessage name="name" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="col-md-6 form-group mb-3">
                          <Field
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Your Email"
                            style={{ borderRadius: '4px', borderColor: '#ced4da', padding: '10px' }}
                          />
                          <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-12 form-group mb-3">
                          <Field
                            type="text"
                            className="form-control"
                            name="subject"
                            placeholder="Subject"
                            style={{ borderRadius: '4px', borderColor: '#ced4da', padding: '10px' }}
                          />
                          <ErrorMessage name="subject" component="div" className="text-danger mt-1" />
                        </div>
                      </div>

                      <div className="form-group mb-4">
                        <Field
                          as="textarea"
                          className="form-control"
                          name="message"
                          rows="5"
                          placeholder="Message"
                          style={{ borderRadius: '4px', borderColor: '#ced4da', padding: '10px' }}
                        />
                        <ErrorMessage name="message" component="div" className="text-danger mt-1" />
                      </div>

                      {formSubmitted && (
                        <div className="alert alert-success text-center d-flex align-items-center justify-content-center" role="alert" style={{ fontWeight: '500' }}>
                          <i className="fas fa-check-circle mr-2" style={{ fontSize: '1.5rem' }}></i>
                          Thank you! Your message has been sent successfully. We've sent you a confirmation email and we'll get back to you soon.
                        </div>
                      )}

                      {submissionError && (
                        <div className="alert alert-danger text-center d-flex align-items-center justify-content-center" role="alert" style={{ fontWeight: '500' }}>
                          <i className="fas fa-exclamation-circle mr-2" style={{ fontSize: '1.5rem' }}></i>
                          {submissionError}
                        </div>
                      )}
                       <div className="form-group mb-3" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <ReCAPTCHA
                          sitekey="6Lf-pGgrAAAAADUvXNmmiTpvRXGSifcGJ1QVVpIR" // Replace with your actual site key
                          onChange={(token) => setRecaptchaToken(token)}
                        />
                      </div>
                      

                      <div className="text-center">
                        <button
                          type="submit"
                          className="animated-element btn btn-primary px-4 py-2"
                          disabled={isSubmitting || !(isValid && dirty)}
                          style={{ fontWeight: '600', fontSize: '1rem', borderRadius: '4px', minWidth: '180px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin mr-2"></i>
                              Sending...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane mr-2"></i>
                              Send Your Message
                            </>
                          )}
                        </button>
                        <button
                          className="btn btn-outline-secondary mt-2 ml-3 px-4 py-2"
                          type="button"
                          onClick={() => resetForm()}
                          disabled={isSubmitting}
                          style={{ fontWeight: '600', fontSize: '1rem', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <i className="fas fa-eraser mr-2"></i>
                          Clear all fields
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
};

export default Contact;
