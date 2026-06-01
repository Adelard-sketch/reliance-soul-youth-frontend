import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./FAQ.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs: FAQItem[] = [
    {
      question: "What is Reliance Soul International Youth Foundation?",
      answer: "Reliance Soul International Youth Foundation (RSYI) is a non-profit organization dedicated to empowering young refugees and marginalized individuals through arts, culture, creative expression, vocational skills, and psychosocial support. We foster healing, leadership, and sustainable livelihoods."
    },
    {
      question: "What programs do you offer?",
      answer: "We offer Music Workshops (performance, composition, instruments, production), Dance Classes (movement, choreography, confidence-building), Design & Crafts Programs (visual arts, crafts, digital creativity), and Studio Booking services for creative projects."
    },
    {
      question: "Who can participate in your programs?",
      answer: "Our programs are open to young people from marginalized communities, including refugees, internally displaced persons (IDPs), and youth seeking creative empowerment and skill development. We welcome participants of all skill levels."
    },
    {
      question: "How can I book your studio space?",
      answer: "You can book our studio space through our Book Studio page. We offer podcast rooms, music recording studios, mastering suites, video studios, photo studios, and sound system rentals. Simply fill out the booking form with your preferred date, time, and service."
    },
    {
      question: "How can I support your mission?",
      answer: "You can support us by making a donation through our Donate page, partnering with us for programs and events, volunteering your time and skills, or spreading awareness about our work on social media."
    },
    {
      question: "Where are you located?",
      answer: "We are based in Uganda and serve refugee communities and marginalized youth across the region. For specific location details or to visit us, please contact us through our Contact page."
    },
    {
      question: "How can I contact you?",
      answer: "You can reach us via email at info@reliancesoulfdn.org, call us at +256 777 969 984, or message us on WhatsApp at +256 777 969 984 or +233 538 453 0458. You can also fill out the contact form on our Contact page."
    },
    {
      question: "Do you accept volunteers?",
      answer: "Yes! We welcome volunteers who are passionate about youth empowerment, arts, and community development. Please contact us through our Contact page to learn about current volunteer opportunities."
    },
    {
      question: "Are your programs free?",
      answer: "Many of our community programs are offered free or at subsidized rates for marginalized youth. Our studio booking services have rental fees that help sustain our operations and fund free programs."
    },
    {
      question: "How can organizations partner with you?",
      answer: "We welcome partnerships with organizations that share our mission. You can partner with us through program sponsorships, collaborative projects, resource sharing, or capacity building initiatives. Contact us via our Contact page to discuss partnership opportunities."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema for search engines and AI tools
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="faq-page">
      <Helmet>
        <title>FAQ | Frequently Asked Questions | Reliance Soul Foundation</title>
        <meta name="description" content="Find answers to frequently asked questions about Reliance Soul International Youth Foundation, our programs, studio booking, donations, and how to get involved." />
        <meta property="og:title" content="FAQ | Reliance Soul International Youth Foundation" />
        <meta property="og:description" content="Find answers to frequently asked questions about our programs, studio booking, donations, and how to get involved." />
        <meta property="og:url" content="https://www.reliancesoulfdn.org/faq" />
        <meta property="og:image" content="https://www.reliancesoulfdn.org/src/assets/reliance_logo.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.reliancesoulfdn.org/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">
          Have questions? We've got answers. Learn more about our mission, programs, and how you can get involved.
        </p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h2>Still have questions?</h2>
          <p>We're here to help. Reach out to us anytime.</p>
          <a href="/contact" className="btn-primary">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
