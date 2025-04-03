import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* Column 1 - About */}
          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li>
                <a href="/about">Our Story</a>
              </li>
              <li>
                <a href="/team">Our Team</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/press">Press</a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Help */}
          <div className="footer-col">
            <h4>Help Center</h4>
            <ul>
              <li>
                <a href="/faq">FAQs</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/tutorials">Tutorials</a>
              </li>
              <li>
                <a href="/webinars">Webinars</a>
              </li>
              <li>
                <a href="/docs">Documentation</a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter for the latest updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your Email" />
              <button type="submit">Subscribe</button>
            </div>

            {/* Social Icons */}
            <div className="social-links">
              <a href="/facebook">
                <FaFacebook />
              </a>
              <a href="/twitter">
                <FaTwitter />
              </a>
              <a href="/instagram">
                <FaInstagram />
              </a>
              <a href="/linkedin">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
