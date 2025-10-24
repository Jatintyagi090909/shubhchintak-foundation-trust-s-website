import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Shubchintak</h3>
              <h3>Foundation Trust</h3>
              <p>
                Pune - 411013<br />
                India<br /><br />
                <strong>Phone:</strong>  <a
                          href="tel:+917385509098"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                          className="phone-link"
                        >
                          +91-7385509098
                        </a><br />
                <strong>Email:</strong> <a
                          href="mailto:admin@shubhchintaktrust.com"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                          className="email-link"
                        >
                          admin@shubhchintaktrust.com
                        </a>
              </p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Join Our Newsletter (COMING SOON)</h4>
              <p></p>
              <form style={{ opacity: '0.2' }} action="" method="post">
                <input type="email" name="email" disabled />
                <input type="submit" disabled value="Join Now" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-md-flex py-4">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright">
            &copy; Copyright <strong><span>SHUBHCHINTAK FOUNDATION TRUST</span></strong>. All Rights Reserved
          </div>
          
        </div>
        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="https://www.facebook.com/ShubhchintakFoundationTrust" className="facebook" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/shubhchintaktrust/" className="instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/company/shubhchintak-foundation-trust/" className="linkedin" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
