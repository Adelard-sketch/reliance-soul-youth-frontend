import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./Donate.css";
import thankImage from "../assets/Ezekiel.jpg"; 

const Donate = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="donate-page">
      <Helmet>
        <title>Donate | Support Youth Empowerment | Reliance Soul Foundation</title>
        <meta name="description" content="Support our mission to empower youth through arts and culture. Your donation makes a real difference in young lives. Help us provide creative programs and opportunities." />
        <meta property="og:title" content="Donate | Support Youth Empowerment | Reliance Soul Foundation" />
        <meta property="og:description" content="Support our mission to empower youth through arts and culture. Your donation makes a real difference in young lives." />
        <meta property="og:url" content="https://www.reliancesoulfdn.org/donate" />
        <meta property="og:image" content="https://www.reliancesoulfdn.org/src/assets/reliance_logo.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.reliancesoulfdn.org/donate" />
      </Helmet>
      
      {/* Left Section: Donation Information */}
      <div className="donate-left">
        <h1>Support Our Mission</h1>
        <p>
          Thank you for your interest in supporting Reliance Soul Foundation. We are currently in the process of setting up our online donation system.
        </p>
        
        <p>
          If you would like to make a donation or learn more about how you can support our work, please contact us directly using any of the details below:
        </p>

        <div className="contact-details">
          <div className="contact-item email-section">
            <div className="contact-header">
              <span className="contact-icon"></span>
              <strong>Email</strong>
            </div>
            <a href="mailto:info@reliancesoulfdn.org" className="contact-link email-link">
              info@reliancesoulfdn.org
            </a>
          </div>

          <div className="contact-item phone-section">
            <div className="contact-header">
              <span className="contact-icon"></span>
              <strong>WhatsApp / Phone</strong>
            </div>
            <div className="phone-grid">
              <a href="https://wa.me/256786048499" className="contact-link phone-link">
                <span className="country-flag">🇺🇬</span>
                +256 786 048 499
              </a>
              <a href="tel:+12488547130" className="contact-link phone-link">
                <span className="country-flag">🇺🇸</span>
                +1 (248) 854-7130
              </a>
              <a href="https://wa.me/233538453058" className="contact-link phone-link">
                <span className="country-flag">🇬🇭</span>
                +233 538 453 058
              </a>
              <a href="https://wa.me/243901116715" className="contact-link phone-link">
                <span className="country-flag">🇨🇩</span>
                +243 901 116 715
              </a>
            </div>
          </div>
        </div>

        <p className="closing-message">
          Our team will be happy to guide you on the available donation options and answer any questions you may have.
        </p>
      </div>

      {/* Right Section: Image + Message */}
      <div className="donate-right">
        <img
          src={thankImage} 
          alt="Thank you for supporting refugees"
          className="donate-image"
        />
        <div className="donate-message">
          <h2>Thank You 💙</h2>
          <p>
            Your generosity fuels hope and helps young refugees and internally displaced persons
            build a brighter future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
